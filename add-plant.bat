@echo off
echo =========================================
echo  PlantMasterPro - Add a New Plant
echo =========================================
echo.
echo This script will guide you to add a new plant to your collection.
echo Please answer the questions that follow.
echo.

chcp 65001 > nul
echo =========================================
echo  PlantMasterPro - Add a New Plant
echo =========================================
echo.
echo This script will guide you to add a new plant to your collection.
echo Please answer the questions that follow.
echo.

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

REM Run the Node.js script
call node addPlant.js

echo.
echo =========================================
echo  Process complete.
echo =========================================
echo.
echo Remember to restart your backend and frontend servers to see the new plant on your website!
echo.

pause
