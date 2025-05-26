@echo off
echo Starting Optifi Next.js development server...
set PATH=%PATH%;C:\Program Files\nodejs
cd %~dp0
"C:\Program Files\nodejs\npx.cmd" next dev
pause 