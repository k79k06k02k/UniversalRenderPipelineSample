@echo OFF
setlocal
set parent=%~dp0
for %%a in ("%parent:~0,-1%") do set ParentFolderName=%%~dpa
set CurrentFolder=%CD%

set list=pre-commit post-checkout post-merge prepare-commit-msg
(for %%f in (%list%) do (
     echo From: %CurrentFolder%\%%f
	 echo To: : %ParentFolderName%.git\hooks\%%f
	 
	 copy %CurrentFolder%\%%f %ParentFolderName%.git\hooks\%%f 
	 echo.
))

echo Finish!!
echo.

pause

