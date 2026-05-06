@echo off
setlocal enabledelayedexpansion%

echo ================================
echo  Push to GitHub
echo ================================
echo.

REM Check if git is initialized
if not exist ".git\" (
    echo Initializing git repository...
    git init
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to initialize git!
        pause
        exit /b 1
    )
)

REM Add all files
echo Adding files to git...
git add .

REM Commit
echo Creating initial commit...
git commit -m "Initial commit: I.A Clothing - Fixed auth, security, and logic errors"

REM Get repo URL from user
set /p REPO_URL="Enter GitHub repo URL (https://github.com/username/repo.git): "

REM Add remote
echo Adding remote: !REPO_URL!
git remote add origin !REPO_URL!

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if !errorlevel! neq 0 (
    echo.
    echo [ERROR] Push failed! Make sure:
    echo 1. You created the repository on GitHub
    echo 2. You are logged in to Git (run: git login)
    echo 3. The URL is correct
    pause
    exit /b 1
)

echo.
echo ================================
echo  Successfully pushed to GitHub!
echo ================================
pause
