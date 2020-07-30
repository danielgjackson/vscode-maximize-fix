# Visual Studio Code Maximized Window Fix (VS Code Extension)

<!-- ![Maximize Window](icon.png) -->

## Features

This code tweaks VS Code windows to fix an issue where the maximized window is larger than the screen on some computers with mixed monitor DPIs.

See [VS Code issue 85592](https://github.com/microsoft/vscode/issues/85592).

The extension adds:

* A command *Maximize Window Fix* (`vscode-maximize-fix.fix`) with default hot-key `Ctrl`+`Alt`+`Shift`+`M`.
* A small status bar icon (☐) to also perform the action.

The program finds any window title ending with *Visual Studio Code* or *Visual Studio Code - Insiders* and removes the `WS_CAPTION` style.

If you don't want to use the extension, you can manually run the underlying executable `vscode-maximize-fix.exe` (you can specify custom window title suffixes as arguments), and a ready built version is available from: [releases](https://github.com/danielgjackson/vscode-maximize-fix/releases).


## Requirements

Only runs (and is required) on Windows.


## Extension Settings

None.


## Release Notes

See: [Change Log](CHANGELOG.md)


## Links

* [GitHub Page: danielgjackson/vscode-maximize-fix](https://github.com/danielgjackson/vscode-maximize-fix)
* [Visual Studio Marketplace: Maximize Window Fix](https://marketplace.visualstudio.com/items?itemName=danielgjackson.vscode-maximize-fix)
<!-- vsce package && vsce publish -->
