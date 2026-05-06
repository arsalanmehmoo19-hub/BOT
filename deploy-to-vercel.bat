@echo off
setlocal enabledelayedexpansion%

echo ================================
echo  Deploy to Vercel
echo ================================
echo.

REM Check/Install Vercel CLI
where vercel >nul 2>nul%
if !errorlevel! neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to install Vercel CLI!
        pause%
        exit /b 1%
    )
)

REM Login to Vercel
echo Logging in to Vercel...
call vercel login%
if !errorlevel! neq 0 (
    echo [ERROR] Vercel login failed!
    pause%
    exit /b 1%
)

REM Create new Vercel project (force create)
echo.
echo Creating new Vercel project...
call vercel --confirm%
if !errorlevel! neq 0 (
    echo [ERROR] Failed to create Vercel project!
    pause%
    exit /b 1%
)

REM Set environment variables in Vercel
echo.
echo Setting environment variables in Vercel...

set ENV_URL=https://tddmlejmhnsvtmebkfte.supabase.co%
set ENV_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZG1sZWptaG5zdnRtZWJrZnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjk3MzgsImV4cCI6MjA5MzYwNTczOH0.j8t7MBfqlWqdmiJ8_pohvAdlBryIa-veF5WzGeCa-38%

call vercel env add NEXT_PUBLIC_SUPABASE_URL !ENV_URL! --yes%
if !errorlevel! neq 0 (
    echo [ERROR] Failed to set SUPABASE_URL!
    pause%
    exit /b 1%
)

call vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY "!ENV_KEY!" --yes%
if !errorlevel! neq 0 (
    echo [ERROR] Failed to set SUPABASE_ANON_KEY!
    pause%
    exit /b 1%
)

REM Deploy to production
echo.
echo Deploying to Vercel production...
call vercel --prod%

if !errorlevel! neq 0 (
    echo.
    echo [ERROR] Deployment failed!
    pause%
    exit /b 1%
)

echo.
echo ================================
echo  Successfully deployed to Vercel!
echo ================================
pause%
