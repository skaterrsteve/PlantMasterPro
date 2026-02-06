@echo off
echo Starting servers...

REM Set a unique title for the backend server window
start "PlantMasterPro Backend Server" cmd /k "cd backend && node server.js"

REM Set a unique title for the frontend server window
start "PlantMasterPro Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Servers are starting in new windows.
echo You can close them by running the 'stop-servers.bat' script.
echo.
pause
