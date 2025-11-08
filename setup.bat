@echo off
echo ========================================
echo eduBridge Setup Script
echo ========================================
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo Creating uploads directory...
if not exist "uploads" mkdir uploads

echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Set up MySQL database using database/schema.sql
echo 2. Update backend/.env with your database credentials
echo 3. Run 'npm run dev' in backend folder
echo 4. Run 'npm start' in frontend folder
echo.
echo Default admin login:
echo Username: admin
echo Password: password
echo.
pause