@echo off
SET "BASE_DIR=%~dp0"
echo Starting servers from %BASE_DIR%...

REM Start Backend
start "PlantMasterPro Backend Server" cmd /k "cd /d %BASE_DIR%backend && node server.js"

REM Start Frontend
start "PlantMasterPro Frontend Server" cmd /k "cd /d %BASE_DIR%frontend && npm start"

echo.
echo Servers are starting in new windows.
echo You can close them by running the 'stop-servers.bat' script.
echo.
pause
