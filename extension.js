const vscode = require('vscode');
const os = require('os')
const fs = require('fs');
const child_process = require('child_process');

const title = 'Maximize Window Fix';

const suffixList = [
	'Visual Studio Code',
	'Visual Studio Code - Insiders',
];

function spawnProcess(context, suffixList) {
	let status = { fixed: 0, total: 0, exit: null, error: null };
	return new Promise((resolve, reject) => {
		try {
			let outBuffer = "";
			const options = {
				stdio: [
					null,
					'pipe',
					'pipe',
				]
			}
			
			// Executable that tweaks VS Code window style to fix the issue
			const command = context.asAbsolutePath('vscode-maximize-fix.exe');
			if (!fs.existsSync(command)) {
				throw `External program not found: ${command}`
			}
			const process = child_process.spawn(command, suffixList, options);
	
			process.stdout.on('data', (data) => {
				outBuffer += data;
				let idx;
				while ((idx = outBuffer.indexOf('\n')) >= 0) {
					const line = outBuffer.substr(0, idx).trim();
					outBuffer = outBuffer.substr(idx + 1);
					// "FIXED #1/1: (title) - Visual Studio Code"
					// "SKIPPED #1/2: (title) - Visual Studio Code"
					const parts = line.replace('#', '').replace('/', ' ').replace(':', ' ').split(' ', 3);
					if (parts.length == 3) {
						if (parts[0] == 'FIXED') status.fixed = parseInt(parts[1]);
						status.total = parseInt(parts[2]);
					} else {
						throw `Unexpected program output: ${data}`
					}
				}
			});
	
			process.stderr.on('data', (data) => {
				throw `Unexpected program error output: ${data}`
			});
	
			process.on('close', (code) => {
				status.exit = code;
				if (code) {
					throw `Unexpected program exit code: ${code}`
				}
				resolve(status);
			});
		} catch (e) {
			status.error = e;
			reject(status);
		}
	});
}

async function runFix(context) {
	if (os.platform() !== 'win32') {
		vscode.window.showWarningMessage(`${title}: This extension can only work on Windows.`);
	} else {
		try {
			//vscode.window.showInformationMessage(`${title}: Fixing maximized windows`);
			statusMessage(`Fixing...`);
			const result = await spawnProcess(context, suffixList);
			let message;
			if (result.fixed == 0) {
				message = `No new windows to fix (${result.total} already fixed).`;
			} else if (result.fixed == 1) {
				message = `Applied maximized window fix.`;
			} else {
				message = `Applied maximized window fix to ${result.fixed} windows.`;
			}
			statusMessage(message);
		} catch (e) {
			statusMessage(`Error while fixing maximized windows.`);
			vscode.window.showErrorMessage(`${title}: Error spawning fix process: ${e.error}`);
		}
	}
}

let statusBarItem = null;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const commandId = 'vscode-maximize-fix.fix';
	
	console.log(`${title}: activate()`);

	const config = vscode.workspace.getConfiguration('vscode-maximize-fix');

	// Override built-in suffixes with config
	if (config['suffix-vscode'] != null) suffixList[0] = config['suffix-vscode'];
	if (config['suffix-vscode-insiders'] != null) suffixList[1] = config['suffix-vscode-insiders'];
	
	const disposable = vscode.commands.registerCommand(commandId, () => {
		runFix(context);
	});
	context.subscriptions.push(disposable);
	
	// Status bar item
	if (config.statusbar) {
		statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 105);
		statusBarItem.command = commandId;
		context.subscriptions.push(statusBarItem);
	}
	updateStatusBarItem();

	// Auto-run on start
	if (config.auto) {
		vscode.commands.executeCommand(commandId);
	}
	
	// If there is a fix in the future, this will inform the user
	const fixedVersionString = null;	// '1.23.45'
	if (fixedVersionString) {
		const fix = fixedVersionString.split('.').map(n => parseInt(n));
		const cur = vscode.version.split('.').map(n => parseInt(n));
		if (cur[0] > fix[0]
			|| (cur[0] == fix[0] && cur[1] > fix[1])
			|| (cur[0] == fix[0] && cur[1] == fix[1] && cur[2] >= fix[2])) {

			vscode.window.showInformationMessage(
				`${title}: This issue should be fixed in VS Code V${vscode.version} (since V${fixedVersionString}), so you could now remove this extension.`,
				'Extension Settings...'
			).then((item) => {
				if (!item) return;
				vscode.commands.executeCommand('workbench.extensions.action.showExtensionsWithIds', ['danielgjackson.vscode-maximize-fix']);
			});
		}
	}
}

let currentStatusMessage = null;
let currentStatusTimeout = null;

function updateStatusBarItem() {
	if (!statusBarItem) return;
	// https://code.visualstudio.com/api/references/icons-in-labels
	// $(chrome-maximize) $(window)
	let text = `$(chrome-maximize)`;
	if (currentStatusMessage) {
		text = text + ' ' + currentStatusMessage;
	}
	statusBarItem.text = text;
	statusBarItem.tooltip = `Fix Maximized Windows`;
	statusBarItem.show();
}

function statusMessage(message) {
	const timeout = 2000;
	if (currentStatusTimeout) {
		clearTimeout(currentStatusTimeout);
		currentStatusTimeout = null;
	}
	if (!statusBarItem) {
		if (message) {
			vscode.window.setStatusBarMessage(message, timeout);
		}
		return;
	}
	currentStatusMessage = message;
	updateStatusBarItem();
	currentStatusTimeout = setTimeout(() => {
		statusMessage(null);
	}, timeout);
}

// this method is called when your extension is deactivated
function deactivate() {
	console.log(`${title}: deactivate()`);
	statusBarItem = null;
}

module.exports = {
	activate,
	deactivate
}
