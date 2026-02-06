@echo off
echo Stopping all PlantMasterPro servers...

REM Find and kill the backend server process by its window title
taskkill /FI "WINDOWTITLE eq PlantMasterPro Backend Server" /F

REM Find and kill the frontend server process by its window title
taskkill /FI "WINDOWTITLE eq PlantMasterPro Frontend Server" /F

echo.
echo All Plant QR server processes have been stopped.
echo.
pause
