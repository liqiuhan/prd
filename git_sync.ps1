# 高级 Git 同步脚本 - PowerShell 版本
param (
    [string]$CommitMessage = "",
    [switch]$Force = $false,
    [switch]$Init = $false
)

function Show-Menu {
    Clear-Host
    Write-Host "===== Git 同步工具 =====" -ForegroundColor Cyan
    Write-Host "本地目录: d:\prd" -ForegroundColor Cyan
    Write-Host "远程仓库: https://github.com/liqiuhanprd" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. 推送更改到远程仓库" -ForegroundColor Yellow
    Write-Host "2. 从远程仓库拉取更改" -ForegroundColor Yellow
    Write-Host "3. 查看当前状态" -ForegroundColor Yellow
    Write-Host "4. 初始化仓库" -ForegroundColor Yellow
    Write-Host "5. 切换分支" -ForegroundColor Yellow
    Write-Host "6. 退出" -ForegroundColor Yellow
    Write-Host ""
    
    $choice = Read-Host "请选择操作 (1-6)"
    return $choice
}

function Push-Repository {
    param (
        [string]$CommitMsg,
        [switch]$ForceFlag
    )
    
    Write-Host "`n正在检查 Git 状态..." -ForegroundColor Yellow
    git status
    
    # 获取提交信息
    if ([string]::IsNullOrWhiteSpace($CommitMsg)) {
        Write-Host ""
        $CommitMsg = Read-Host "请输入提交信息 (默认: '更新文档')"
        if ([string]::IsNullOrWhiteSpace($CommitMsg)) {
            $CommitMsg = "更新文档"
        }
    }
    
    # 添加文件
    Write-Host "`n正在添加文件..." -ForegroundColor Yellow
    git add .
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 无法添加文件" -ForegroundColor Red
        return $false
    }
    
    # 提交更改
    Write-Host "`n正在提交更改..." -ForegroundColor Yellow
    git commit -m $CommitMsg
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 无法提交更改" -ForegroundColor Red
        return $false
    }
    
    # 获取当前分支
    $currentBranch = (git branch --show-current)
    if ($LASTEXITCODE -ne 0) {
        $currentBranch = "main"
    }
    
    # 推送到远程仓库
    Write-Host "`n正在推送到远程仓库 (分支: $currentBranch)..." -ForegroundColor Yellow
    
    if ($ForceFlag) {
        Write-Host "警告: 使用强制推送!" -ForegroundColor Red
        git push origin $currentBranch --force
    } else {
        git push origin $currentBranch
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 推送失败" -ForegroundColor Red
        Write-Host "可能需要先执行 git pull 获取远程更改" -ForegroundColor Yellow
        
        $pull = Read-Host "是否执行 git pull? (y/n)"
        if ($pull -eq "y") {
            git pull origin $currentBranch
            
            if ($ForceFlag) {
                git push origin $currentBranch --force
            } else {
                git push origin $currentBranch
            }
            
            if ($LASTEXITCODE -ne 0) {
                Write-Host "错误: 推送仍然失败" -ForegroundColor Red
                return $false
            }
        } else {
            return $false
        }
    }
    
    Write-Host "`n推送成功完成!" -ForegroundColor Green
    return $true
}

function Pull-Repository {
    # 获取当前分支
    $currentBranch = (git branch --show-current)
    if ($LASTEXITCODE -ne 0) {
        $currentBranch = "main"
    }
    
    Write-Host "`n正在从远程仓库拉取更改 (分支: $currentBranch)..." -ForegroundColor Yellow
    git pull origin $currentBranch
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 拉取失败" -ForegroundColor Red
        return $false
    }
    
    Write-Host "`n拉取成功完成!" -ForegroundColor Green
    return $true
}

function Show-Status {
    Write-Host "`n正在检查 Git 状态..." -ForegroundColor Yellow
    git status
    
    Write-Host "`n当前分支:" -ForegroundColor Yellow
    git branch
    
    Write-Host "`n最近提交:" -ForegroundColor Yellow
    git log --oneline -n 5
    
    Write-Host "`n远程仓库信息:" -ForegroundColor Yellow
    git remote -v
}

function Initialize-Repository {
    if (Test-Path ".git") {
        Write-Host "仓库已经初始化" -ForegroundColor Yellow
        return $true
    }
    
    Write-Host "`n正在初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 无法初始化仓库" -ForegroundColor Red
        return $false
    }
    
    Write-Host "`n正在配置远程仓库..." -ForegroundColor Yellow
    git remote add origin https://github.com/liqiuhanprd
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 无法配置远程仓库" -ForegroundColor Red
        return $false
    }
    
    Write-Host "`n仓库初始化成功!" -ForegroundColor Green
    return $true
}

function Switch-Branch {
    Write-Host "`n当前分支:" -ForegroundColor Yellow
    git branch
    
    Write-Host "`n可用的远程分支:" -ForegroundColor Yellow
    git branch -r
    
    Write-Host ""
    $newBranch = Read-Host "请输入要切换的分支名称 (新分支请输入 'new:分支名')"
    
    if ($newBranch.StartsWith("new:")) {
        $branchName = $newBranch.Substring(4)
        Write-Host "`n正在创建并切换到新分支: $branchName..." -ForegroundColor Yellow
        git checkout -b $branchName
    } else {
        Write-Host "`n正在切换到分支: $newBranch..." -ForegroundColor Yellow
        git checkout $newBranch
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "错误: 无法切换分支" -ForegroundColor Red
        return $false
    }
    
    Write-Host "`n分支切换成功!" -ForegroundColor Green
    return $true
}

# 主程序
try {
    # 切换到指定目录
    Set-Location -Path "d:\prd" -ErrorAction Stop
    Write-Host "已切换到目录: d:\prd" -ForegroundColor Green
} catch {
    Write-Host "错误: 无法切换到 d:\prd 目录" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit 1
}

# 配置 Git
Write-Host "`n正在配置 Git..." -ForegroundColor Yellow
git config --global core.autocrlf false
git config --global core.quotepath false

# 如果指定了初始化参数
if ($Init) {
    Initialize-Repository
}

# 如果直接指定了提交信息，则直接推送
if ($CommitMessage -ne "") {
    Push-Repository -CommitMsg $CommitMessage -ForceFlag:$Force
    exit 0
}

# 显示菜单并处理用户选择
while ($true) {
    $choice = Show-Menu
    
    switch ($choice) {
        "1" { 
            Push-Repository -ForceFlag:$Force
            Write-Host "`n按任意键继续..."
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "2" { 
            Pull-Repository
            Write-Host "`n按任意键继续..."
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "3" { 
            Show-Status
            Write-Host "`n按任意键继续..."
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "4" { 
            Initialize-Repository
            Write-Host "`n按任意键继续..."
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "5" { 
            Switch-Branch
            Write-Host "`n按任意键继续..."
            $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        }
        "6" { exit 0 }
        default { 
            Write-Host "`n无效的选择，请重试" -ForegroundColor Red
            Start-Sleep -Seconds 2
        }
    }
} 