@echo off
echo Starting Finance Dashboard Frontend...
echo.

echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo Starting frontend development server...
echo Frontend will run on http://localhost:3000
echo Make sure the backend is running on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
