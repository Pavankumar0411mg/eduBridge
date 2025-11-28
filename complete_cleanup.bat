@echo off
echo ========================================
echo eduBridge Complete User Data Cleanup
echo ========================================
echo.
echo This script will:
echo 1. Delete all Students, Teachers, and Parents from database
echo 2. Delete all related data (materials, quizzes, progress reports)
echo 3. Clean up uploaded files
echo.
echo WARNING: This action cannot be undone!
echo.
set /p confirm="Are you sure you want to proceed? (y/N): "
if /i not "%confirm%"=="y" (
    echo Cleanup cancelled.
    pause
    exit /b
)

echo.
echo Step 1: Running database cleanup...
mysql -u root -p eduBridgeDB < "database\delete_user_data.sql"

if %errorlevel% neq 0 (
    echo Error: Database cleanup failed!
    pause
    exit /b 1
)

echo Database cleanup completed successfully.
echo.

echo Step 2: Cleaning up uploaded files...
cd /d "backend\uploads"
del /q *.* 2>nul
cd /d "..\\.."

echo File cleanup completed.
echo.
echo ========================================
echo Cleanup completed successfully!
echo ========================================
echo.
echo Summary:
echo - All Students, Teachers, and Parents deleted
echo - All study materials, quizzes, and progress reports deleted
echo - All uploaded files removed
echo - Admin user and system structure preserved
echo.
pause