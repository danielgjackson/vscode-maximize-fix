# Change Log

## 1.5.0

- The underlying issue seems to be fixed in the current stable version of VS Code.  On a fixed version, the extension informs the user that it has not auto-run and suggests uninstalling.  It can still be run manually, and the version check can be bypassed with the `vscode-maximize-fix.force` extension setting.

## 1.4.0

- Added a check for the (default) setting `window.titleBarStyle` == `custom`.
- Created an option to ignore system/configuration checks and run anyway: `vscode-maximize-fix.force`.
- Set the toolbar icon's tooltip as the last status message.
- Fixed a reporting bug if more than one window was adjusted.
- Removed junk files from the .vsix package.

## 1.3.0

- Bumped version number to match executable release.
- Automatically runs on startup by default.
- Added configuration settings (auto-start, status bar, custom window title suffixes).
- Status now reports how many windows received the fix.

## 0.0.3

- Improved README.

## 0.0.2

- Window title filter matches VS Code Insiders builds too.

## 0.0.1

- Initial release
