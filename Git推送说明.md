# Git 推送脚本使用说明

本目录包含三个脚本，用于将本地 `d:\prd` 目录的内容推送到远程仓库 `https://github.com/liqiuhanprd`。

## 脚本说明

1. **push.bat** - 简单的批处理脚本
   - 最基本的推送功能
   - 支持自定义提交信息
   - 包含简单的错误处理

2. **push.ps1** - PowerShell 脚本
   - 提供更好的错误处理
   - 彩色输出，更友好的用户界面
   - 支持自定义提交信息

3. **git_sync.ps1** - 高级 PowerShell 脚本
   - 提供菜单界面，支持多种操作
   - 支持推送、拉取、查看状态、初始化仓库、切换分支等功能
   - 支持命令行参数

## 使用方法

### 使用 push.bat

1. 双击运行 `push.bat`
2. 输入提交信息（或直接回车使用默认信息 "更新文档"）
3. 等待推送完成

### 使用 push.ps1

1. 右键点击 `push.ps1`，选择 "使用 PowerShell 运行"
2. 输入提交信息（或直接回车使用默认信息 "更新文档"）
3. 等待推送完成

### 使用 git_sync.ps1

#### 通过菜单界面使用

1. 右键点击 `git_sync.ps1`，选择 "使用 PowerShell 运行"
2. 在菜单中选择需要的操作：
   - 1: 推送更改到远程仓库
   - 2: 从远程仓库拉取更改
   - 3: 查看当前状态
   - 4: 初始化仓库
   - 5: 切换分支
   - 6: 退出

#### 通过命令行参数使用

```powershell
# 使用默认提交信息推送
powershell -ExecutionPolicy Bypass -File git_sync.ps1

# 使用自定义提交信息推送
powershell -ExecutionPolicy Bypass -File git_sync.ps1 -CommitMessage "修复了某个问题"

# 强制推送
powershell -ExecutionPolicy Bypass -File git_sync.ps1 -Force

# 初始化仓库并推送
powershell -ExecutionPolicy Bypass -File git_sync.ps1 -Init
```

## 注意事项

1. 首次使用前，请确保已安装 Git 并配置好用户信息：
   ```
   git config --global user.name "您的用户名"
   git config --global user.email "您的邮箱"
   ```

2. 如果远程仓库需要身份验证，可能会弹出登录窗口，请输入您的 GitHub 用户名和密码或个人访问令牌。

3. 如果您的仓库尚未初始化，请先使用 `git_sync.ps1` 中的初始化功能（选项 4）或添加 `-Init` 参数。

4. 强制推送（`-Force` 参数）会覆盖远程仓库的更改，请谨慎使用。

## 故障排除

1. **无法执行 PowerShell 脚本**
   - 以管理员身份运行 PowerShell，执行以下命令：
     ```
     Set-ExecutionPolicy RemoteSigned
     ```

2. **推送失败**
   - 检查网络连接
   - 确认 GitHub 凭据是否正确
   - 尝试先执行 `git pull` 获取远程更改

3. **找不到 git 命令**
   - 确保 Git 已安装并添加到系统 PATH 环境变量中 