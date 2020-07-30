# VS Code Maximized Fix

This code tweaks the VS Code window style to fix an issue where the maximized window is larger than the screen.

See [VS Code issue 85592](https://github.com/microsoft/vscode/issues/85592).

The program simply finds any window title ending with *Visual Studio Code* (or specified on the command-line) and removes the style `WS_CAPTION`.

To use run `vscode-maximize-fix.exe` from:

  * [Releases](https://github.com/danielgjackson/vscode-maximize-fix/releases/tag/1.0)

