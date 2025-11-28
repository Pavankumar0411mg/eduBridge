@echo off
echo Cleaning up uploaded files...

cd /d "c:\Users\Pavan Kumar M G\Documents\GitHub\eduBridge\backend\uploads"

echo Deleting all uploaded files...
del /q *.*

echo Upload directory cleaned.
echo.
echo Note: Only delete files if you're sure they're no longer needed.
echo The database cleanup script should be run first to identify which files to delete.

pause