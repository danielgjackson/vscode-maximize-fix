@ECHO OFF
SETLOCAL EnableDelayedExpansion
CD /D %~dp0

set ARCH=x86

SET VCVARSALL=
FOR %%f IN (70 71 80 90 100 110 120 130 140) DO IF EXIST "!VS%%fCOMNTOOLS!\..\..\VC\vcvarsall.bat" SET VCVARSALL=!VS%%fCOMNTOOLS!\..\..\VC\vcvarsall.bat
FOR /D %%f IN ("%ProgramFiles(x86)%\Microsoft Visual Studio\????") DO FOR %%g IN (Community Professional Enterprise) DO IF EXIST "%%f\%%g\VC\Auxiliary\Build\vcvarsall.bat" SET VCVARSALL=%%f\%%g\VC\Auxiliary\Build\vcvarsall.bat
IF "%VCVARSALL%"=="" ECHO Cannot find C compiler environment for 'vcvarsall.bat'. & PAUSE & GOTO :EOF
ECHO Setting environment variables for C compiler... %VCVARSALL%
call "%VCVARSALL%" %ARCH%

ECHO ARCH=%ARCH%
ECHO LIB=%LIB%
ECHO INCLUDE=%INCLUDE%
ECHO LIBPATH=%LIBPATH%
ECHO WINDOWSSDKDIR=%WindowsSdkDir%
ECHO WINDOWSSDKVERSION=%WindowsSDKVersion%

:TEST
ECHO Building program...
cl -c /EHsc /Tc"vscode-maximize-fix.c"
IF ERRORLEVEL 1 GOTO ERROR
link /out:vscode-maximize-fix.exe User32.lib vscode-maximize-fix
IF ERRORLEVEL 1 GOTO ERROR
GOTO END

:ERROR
ECHO ERROR: An error occured.
rem pause
exit /B 1
goto :eof

:END
