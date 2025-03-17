@echo off
echo ===== Git 推送脚本 =====
echo 将本地 d:\prd 目录推送到 https://github.com/liqiuhanprd

cd /d d:\prd
if %errorlevel% neq 0 (
    echo 错误: 无法切换到 d:\prd 目录
    goto :error
)

echo.
echo 正在配置 Git...
git config --global core.autocrlf false
git config --global core.quotepath false

echo.
echo 正在检查 Git 状态...
git status
echo.

set /p commit_msg=请输入提交信息 (默认: "更新文档"): 
if "%commit_msg%"=="" set commit_msg=更新文档

echo.
echo 正在添加文件...
git add .
if %errorlevel% neq 0 (
    echo 错误: 无法添加文件
    goto :error
)

echo.
echo 正在提交更改...
git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo 错误: 无法提交更改
    goto :error
)

echo.
echo 正在推送到远程仓库...
git push origin main
if %errorlevel% neq 0 (
    echo 错误: 推送失败
    echo 可能需要先执行 git pull 获取远程更改
    set /p pull=是否执行 git pull? (y/n): 
    if /i "%pull%"=="y" (
        git pull origin main
        git push origin main
    ) else (
        goto :error
    )
)

echo.
echo 推送成功完成!
goto :end

:error
echo.
echo 操作未完成，请检查错误信息。

:end
pause
