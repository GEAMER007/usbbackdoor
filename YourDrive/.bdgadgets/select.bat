@echo off
powershell -c move ..\autorun.njsbc" autorun.njsbc
powershell -c ren %1 .\autorunn.njsbc
set curdir=%cd%
cd ..
powershell -c move %curdir%\autorunn.njsbc .\autorun.njsbc
cd %curdir%
set /p name="what is the name of current autorun(with .njsbc):"
powershell -c ren autorun.njsbc %name%