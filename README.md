# Maximized Window Fix for Visual Studio Code

<!-- ![Maximize Window](icon.png) -->

## Features

This fixes a VS Code issue where the maximized window is larger than the screen on some computers with mixed DPI monitors.

See [VS Code issue 85592](https://github.com/microsoft/vscode/issues/85592).

The fix runs automatically when the extension starts, and a small small status bar icon (☐) shows feedback.

You should not have to manually run the fix but, if you need to, the extension adds a command *Maximize Window Fix* (`vscode-maximize-fix.fix`) with default hot-key `Ctrl`+`Alt`+`Shift`+`M`, and you can also run this command by clicking on the status bar icon (☐).

The "fix" finds matching windows (by default, those with titles ending with *Visual Studio Code* or *Visual Studio Code - Insiders*) and removes the `WS_CAPTION` window style.  

<!-- 
TODO: Add a check for `window.titleBarStyle` == `custom`
Please note that this assumes you have `window.titleBarStyle` on the default setting of `custom`; a setting of `native` might be another way to avoid this bug, but do not use with this extension as your windows will be difficult to control without a title bar!
-->

As an alternative to the extension, you can manually run the underlying executable `vscode-maximize-fix.exe` (you can specify custom window title suffixes as arguments), and a ready built version is available from: [releases](https://github.com/danielgjackson/vscode-maximize-fix/releases).


## Requirements

Only runs (and is only needed) on Windows.


## Extension Settings

Settings:

* `vscode-maximize-fix.auto` -- Automatically run the Maximize Window Fix when the extension starts. (default: true)
* `vscode-maximize-fix.statusbar` -- Shows a status bar icon (☐) to show feedback or to manually run the fix. (default: true)
* `vscode-maximize-fix.suffix-vscode` -- Window title suffix to match VS Code windows. (default: *Visual Studio Code*)
* `vscode-maximize-fix.suffix-vscode-insiders` -- Window title suffix to match VS Code Insiders windows. (default: *Visual Studio Code - Insiders*)
* `vscode-maximize-fix.force` -- Ignore checks for the right platform/configuration and always run the fix. (default: false)


## Release Notes

See: [Change Log](CHANGELOG.md)


## Links

* [GitHub Page: danielgjackson/vscode-maximize-fix](https://github.com/danielgjackson/vscode-maximize-fix)
* [Visual Studio Marketplace: Maximize Window Fix](https://marketplace.visualstudio.com/items?itemName=danielgjackson.vscode-maximize-fix)
<!-- vsce package && vsce publish -->
