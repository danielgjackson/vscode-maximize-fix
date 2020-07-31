@ECHO OFF
SETLOCAL EnableDelayedExpansion
CD /D %~dp0

SET INTERACTIVE=
ECHO.%CMDCMDLINE% | FINDSTR /C:"%windir%\system32\cmd.exe /c" >NUL
IF ERRORLEVEL 1 SET INTERACTIVE=1

SET FIND_CL=
FOR %%p IN (cl.exe) DO SET "FIND_CL=%%~$PATH:p"
IF DEFINED FIND_CL (
  ECHO Build tools already on path.
  GOTO BUILD
)

ECHO Build tools not on path, looking for 'vcvarsall.bat'...
SET ARCH=x86
SET VCVARSALL=
FOR %%f IN (70 71 80 90 100 110 120 130 140) DO IF EXIST "!VS%%fCOMNTOOLS!\..\..\VC\vcvarsall.bat" SET VCVARSALL=!VS%%fCOMNTOOLS!\..\..\VC\vcvarsall.bat
FOR /F "usebackq tokens=*" %%f IN (`DIR /B /ON "%ProgramFiles(x86)%\Microsoft Visual Studio\????"`) DO FOR %%g IN (Community Professional Enterprise) DO IF EXIST "%ProgramFiles(x86)%\Microsoft Visual Studio\%%f\%%g\VC\Auxiliary\Build\vcvarsall.bat" SET "VCVARSALL=%ProgramFiles(x86)%\Microsoft Visual Studio\%%f\%%g\VC\Auxiliary\Build\vcvarsall.bat"
IF "%VCVARSALL%"=="" ECHO Cannot find C compiler environment for 'vcvarsall.bat'. & GOTO ERROR
ECHO Setting environment variables for C compiler... %VCVARSALL%
CALL "%VCVARSALL%" %ARCH%

:BUILD
SET NOLOGO=/nologo
ECHO Compiling...
cl %NOLOGO% -c /EHsc /Tc"vscode-maximize-fix.c"
IF ERRORLEVEL 1 GOTO ERROR
ECHO Resources...
rc %NOLOGO% vscode-maximize-fix.rc
IF ERRORLEVEL 1 GOTO ERROR
ECHO Linking...
link %NOLOGO% /out:vscode-maximize-fix.exe User32.lib vscode-maximize-fix vscode-maximize-fix.res
IF ERRORLEVEL 1 GOTO ERROR
ECHO Done.
IF NOT DEFINED INTERACTIVE COLOR 2F & PAUSE & COLOR
GOTO :EOF

:ERROR
ECHO ERROR: An error occured.
IF NOT DEFINED INTERACTIVE COLOR 4F & PAUSE & COLOR
EXIT /B 1
GOTO :EOF
