@echo off
echo =========================================
echo  PlantMasterPro - Edit a Plant
echo =========================================
echo.
echo This script will help you edit an existing plant's details.
echo Please follow the prompts.
echo.

chcp 65001 > nul

REM Check if Node.js is installed and in PATH
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not found in your system's PATH.
    echo Please ensure Node.js is installed and accessible from the command line.
    echo You can download it from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Navigate to the CLI directory
cd cli

REM Run the Node.js script to edit a plant
call node editPlant.js

echo.
echo =========================================
echo  Process complete.
echo =========================================
echo.
echo Remember to run "update-plants-online.bat" to push changes to your online website!
echo.

pause
