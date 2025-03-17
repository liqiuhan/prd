# Git 推送脚本 - PowerShell 版本
Write-Host "===== Git 推送脚本 =====" -ForegroundColor Cyan
Write-Host "将本地 d:\prd 目录推送到 https://github.com/liqiuhanprd" -ForegroundColor Cyan
Write-Host ""

# 切换到指定目录
try {
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
git config --global user.name "liqiuhan"
git config --global user.email "liqiuhan100@gmail.com"

# 检查 Git 状态
Write-Host "`n正在检查 Git 状态..." -ForegroundColor Yellow
git status

# 获取提交信息
Write-Host ""
$commitMsg = Read-Host "请输入提交信息 (默认: '更新文档')"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "更新文档"
}

# 添加文件
Write-Host "`n正在添加文件..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 无法添加文件" -ForegroundColor Red
    exit 1
}

# 提交更改
Write-Host "`n正在提交更改..." -ForegroundColor Yellow
git commit -m $commitMsg
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 无法提交更改" -ForegroundColor Red
    exit 1
}

# 推送到远程仓库
Write-Host "`n正在推送到远程仓库..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: 推送失败" -ForegroundColor Red
    Write-Host "可能需要先执行 git pull 获取远程更改" -ForegroundColor Yellow
    
    $pull = Read-Host "是否执行 git pull? (y/n)"
    if ($pull -eq "y") {
        git pull origin main
        git push origin main
        if ($LASTEXITCODE -ne 0) {
            Write-Host "错误: 推送仍然失败" -ForegroundColor Red
            exit 1
        }
    } else {
        exit 1
    }
}

Write-Host "`n推送成功完成!" -ForegroundColor Green
Write-Host "按任意键继续..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Set-ExecutionPolicy Unrestricted 