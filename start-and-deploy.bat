@echo off
setlocal enabledelayedexpansion%

:menu
cls%
echo ===============================
echo  I.A Clothing - Master Menu
echo ===============================
echo.
echo  1. Run App (Dev Server)
echo  2. Push to GitHub
echo  3. Deploy to Vercel
echo  4. Exit
echo.

set /p CHOICE="Enter choice (1-4): "

if "!CHOICE!"=="1" goto runapp%
if "!CHOICE!"=="2" goto pushgithub%
if "!CHOICE!"=="3" goto deployvercel%
if "!CHOICE!"=="4" exit /b 0%

echo Invalid choice!%
pause%
goto menu%

:runapp%
call run-app.bat%
goto menu%

:pushgithub%
call push-to-github.bat%
goto menu%

:deployvercel%
call deploy-to-vercel.bat%
goto menu%
