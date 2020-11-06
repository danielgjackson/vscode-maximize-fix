# Maximized Window Fix for Visual Studio Code

<!-- ![Maximize Window](icon.png) -->

**Important:** The issue [seems to be fixed](https://github.com/microsoft/vscode/issues/85592#event-3884295282) in the current version of VS Code (since V1.51, October 2020), so this extension should no longer be required.  If you are on that version or later, the extension will not auto-run the fix and it will suggest uninstalling.  If you find you do still need it, you can run the fix manually by clicking on the status bar icon (☐), and/or set the `vscode-maximize-fix.force` extension setting described below to prevent the warning.


## Features

This extension works around [VS Code issue 85592](https://github.com/microsoft/vscode/issues/85592), where the maximized window is larger than the screen on some computers with mixed DPI monitors.  

The fix runs automatically when the extension starts, and a small small status bar icon (☐) shows feedback.  It works by finding VS Code windows (by default, those with titles ending with *Visual Studio Code* or *Visual Studio Code - Insiders*) and removes the `WS_CAPTION` window style. 

You should not have to manually run the fix but, if you choose to, the extension adds a command *Maximize Window Fix* (`vscode-maximize-fix.fix`) with default hot-key `Ctrl`+`Alt`+`Shift`+`M`, and you can also run this command by clicking on the status bar icon (☐).


## Requirements

This extension is only needed in affected versions running on Windows with the (default) setting `window.titleBarStyle` == `custom`.


## Extension Settings

Settings:

* `vscode-maximize-fix.auto` -- Automatically run the Maximize Window Fix when the extension starts. (default: true)
* `vscode-maximize-fix.statusbar` -- Shows a status bar icon (☐) to show feedback or to manually run the fix. (default: true)
* `vscode-maximize-fix.suffix-vscode` -- Window title suffix to match VS Code windows. (default: *Visual Studio Code*)
* `vscode-maximize-fix.suffix-vscode-insiders` -- Window title suffix to match VS Code Insiders windows. (default: *Visual Studio Code - Insiders*)
* `vscode-maximize-fix.force` -- Ignore checks for the right platform/configuration/version and always run the fix. Be warned that your title bar might go missing if you've changed the (default) setting `window.titleBarStyle` == `custom`. (default: false)


## Release Notes

See: [Change Log](CHANGELOG.md)


## Installation

To install the extension, click *Install* on:

* [Visual Studio Marketplace: Maximize Window Fix](https://marketplace.visualstudio.com/items?itemName=danielgjackson.vscode-maximize-fix)

Alternative installation methods:

* In *Visual Studio Code* open the *Extensions* panel (`Ctrl`+`Shift`+`X`), search for `Maximized Window Fix` and click *Install*
* Or, in *Visual Studio Code* press `Ctrl`+`P` and type: `ext install danielgjackson.vscode-maximize-fix`.
* Or, manually *Install from VSIX...* the ready-built `.vsix` file from: [GitHub releases](https://github.com/danielgjackson/vscode-maximize-fix/releases).

The extension is [open source](https://github.com/danielgjackson/vscode-maximize-fix/blob/master/LICENSE.txt) and the source code is available at:

* [GitHub page: danielgjackson/vscode-maximize-fix](https://github.com/danielgjackson/vscode-maximize-fix)

You can download the source with:

* `git clone https://github.com/danielgjackson/vscode-maximize-fix`
* Or, download a snapshot: `PowerShell -Command "& {Invoke-WebRequest https://github.com/danielgjackson/vscode-maximize-fix/archive/master.zip -o _temp.zip ; Expand-Archive _temp.zip ; move _temp\vscode-maximize-fix-master vscode-maximize-fix ; rmdir _temp ; del _temp.zip}"`
<!--
* Or, download a snapshot using Windows Subsystem for Linux: `wsl curl -L https://github.com/danielgjackson/vscode-maximize-fix/archive/master.zip -o _temp.zip ; unzip _temp.zip -d _temp ; mv _temp/vscode-maximize-fix-master vscode-maximize-fix ; rmdir _temp ; rm _temp.zip`
-->

You can build your own extension package `.vsix` file (*Node.js* must be installed first):

* `npm install -g vsce && npm install && vsce package`

<!--
To publish your extension:

* `vsce publish`
-->

As an alternative to using the extension, you can manually run the underlying executable `vscode-maximize-fix.exe` (you may specify custom window title suffixes as arguments):

* If already installed with the extension, located at: `%USERPROFILE%\.vscode\extensions\danielgjackson.vscode-maximize-fix-*`.
* Or, download the ready-built binary from: [GitHub releases](https://github.com/danielgjackson/vscode-maximize-fix/releases).
* Or, build from source using Microsoft Build Tools: `build.cmd`.
* Or, build from source by cross-compiling from Windows Subsystem for Linux (with a Ubuntu/Debian default distro): `wsl sudo apt install build-essential gcc-mingw-w64 && wsl make`.
