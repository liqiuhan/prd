@echo off
cd /d d:\drd
git config --global core.autocrlf false
git config --global core.quotepath false
git add .
git commit -m "Auto commit"
git push origin main --force
pause
