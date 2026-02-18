@echo off
chcp 65001 > nul
echo =========================================
echo  PlantMasterPro - Update Plants Online
echo =========================================
echo.
echo This script will add your local plant data changes to Git,
echo commit them, and push them to your GitHub repository.
echo This will trigger an automatic redeployment of your online website.
echo.

REM --- Step 1: Check if Git is initialized ---
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not found in your system's PATH.
    echo Please ensure Git is installed and accessible from the command line.
    echo You can download it from: https://git-scm.com/
    echo.
    pause
    exit /b 1
)

REM Check if .git directory exists
if not exist ".git" (
    echo ERROR: Git repository not initialized.
    echo Please run "git init" in the project root first.
    echo.
    pause
    exit /b 1
)

REM --- Step 2: Add all changes to Git ---
echo Adding all changes to Git staging area...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to stage changes.
    pause
    exit /b 1
)
echo.

REM --- Step 3: Get commit message ---
set "commitMsg="
set /p commitMsg="Enter a description of your changes (e.g., Updated plant details): "
if not defined commitMsg (
    set commitMsg=Update plant data and website
)
echo.

REM --- Step 4: Commit changes ---
echo Committing changes...
git commit -m "%commitMsg%"
if %errorlevel% neq 0 (
    echo.
    echo INFO: No new changes to commit.
)
echo.

REM --- Step 5: Push changes to GitHub ---
echo Pushing changes to GitHub (main branch)...
git push origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push changes to GitHub.
    echo Please check your internet connection and GitHub authentication.
    pause
    exit /b 1
)
echo.

echo =========================================
echo  Update Complete!
echo =========================================
echo Your changes have been pushed to GitHub.
echo Render and Vercel will now automatically redeploy your website.
echo This may take a few minutes for the changes to appear online.
echo.

pause
