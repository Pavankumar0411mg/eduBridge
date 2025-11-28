@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: eduBridge - Rural Education Platform"

echo Adding remote origin...
echo Please replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/eduBridge.git

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo Repository successfully pushed to GitHub!
echo Don't forget to replace YOUR_USERNAME in the remote URL with your actual GitHub username
pause