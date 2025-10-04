@echo off
echo Starting Finance Dashboard Backend...
echo.

echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Starting backend server...
echo Backend will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
