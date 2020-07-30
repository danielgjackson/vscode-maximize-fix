const vscode = require('vscode');
const os = require('os')
//const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

const title = 'Maximize Window Fix';

const suffixList = [
	'Visual Studio Code',
	'Visual Studio Code - Insiders',
];

function spawnProcess(context, suffixList) {
	try {
		const options = {};
		
		// Executable that tweaks VS Code window style to fix the issue
		const command = context.asAbsolutePath('vscode-maximize-fix.exe');
		
		let process;
		if (fs.existsSync(command)) {
			process = child_process.spawn(command, suffixList, options);
		} else {
			console.error(`${title}: External program not found: ${command}`);
			return false;
		}

		process.on('close', (code) => {
			if (code) {
				console.error(`${title}: Unexpected exit code: ${code}`);
				vscode.window.showErrorMessage(`${title}: Unexpected process exit: ${code}`);
			}
		});		
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

function runFix(context) {
	const release = os.release().split('.').map(x => parseInt(x));
	if (os.platform() !== 'win32') {
		vscode.window.showWarningMessage(`${title}: This extension can only work on Windows.`);
	} else if (spawnProcess(context, suffixList)) {
		//vscode.window.showInformationMessage(`${title}: Fixing maximized windows`);
		statusMessage('Fixing maximized windows...');
	} else {
		vscode.window.showErrorMessage(`${title}: Error spawning fix process`);
	}
}

let statusBarItem = null;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const commandId = 'vscode-maximize-fix.fix';
	
	console.log(`${title}: activate()`);
	
	const disposable = vscode.commands.registerCommand(commandId, () => {
		runFix(context);
	});
	context.subscriptions.push(disposable);
	
	// create a new status bar item that we can now manage
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 95);
	statusBarItem.command = commandId;
	context.subscriptions.push(statusBarItem);
	
	updateStatusBarItem();
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
		if (!message) {
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
