@echo off
echo Adding missing folders to GitHub...

git add backend/
git add frontend/
git add database/
git add assets/

echo Committing changes...
git commit -m "Add backend, frontend, database, and assets folders"

echo Pushing to GitHub...
git push origin main

echo Repository updated successfully!
pause