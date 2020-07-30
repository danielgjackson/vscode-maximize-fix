# Visual Studio Code Maximized Window Fix (VS Code Extension)

<!-- ![Maximize Window](icon.png) -->

## Features

This code tweaks the VS Code window style to fix an issue where the maximized window is larger than the screen on some computers with mixed monitor DPIs.

See [VS Code issue 85592](https://github.com/microsoft/vscode/issues/85592).

* Command *Maximize Window Fix* (`vscode-maximize-fix.fix`) with default hot-key `Ctrl`+`Alt`+`Shift`+`M`.
* A small status bar icon to perform the action.

The program simply finds any window title ending with *Visual Studio Code* (or specified on the command-line) and removes the style `WS_CAPTION`.

If you don't want to use the extension, you can manually run `vscode-maximize-fix.exe`, a ready built version available from: [Releases](https://github.com/danielgjackson/vscode-maximize-fix/releases/tag/1.0).


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
