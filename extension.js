const vscode = require('vscode'),
    path = require('path'),
    fs = require('fs');

function activate(context) {
    let openCorrespondingFile = vscode.commands.registerCommand('directorySwitcher.openCorrespondingFile', function() {
        let config = vscode.workspace.getConfiguration('directorySwitcher'),
            baseDirectory = (vscode.workspace.rootPath + '\\' + config['baseDirectory']).toLowerCase(),
            correspondingDirectory = (
                vscode.workspace.rootPath +
                '\\' +
                config['correspondingDirectory']
            ).toLowerCase(),
            currentFile = vscode.window.activeTextEditor.document.fileName,
            currentFilePath = path.dirname(currentFile).toLowerCase();

        if (!currentFilePath.includes(baseDirectory) && !currentFilePath.includes(correspondingDirectory)) {
            vscode.window.showInformationMessage(
                `This file is not in either base directory (${baseDirectory}) or the corresponding directory (${correspondingDirectory}).`
            );

            return;
        }

        // Calculate the corresponding file path to open or create
        let correspondingFile = currentFilePath.includes(baseDirectory)
                ? currentFile.toLowerCase().replace(baseDirectory, correspondingDirectory)
                : currentFile.toLowerCase().replace(correspondingDirectory, baseDirectory),
            correspondingPath = path.dirname(correspondingFile);

        if (fs.existsSync(correspondingFile)) {
            // Open the file if it already exists

            vscode.workspace.openTextDocument(correspondingFile).then(doc => {
                vscode.window.showTextDocument(doc, {
                    preview: false
                });
            });
        } else {
            // Ask if we want to create file

            vscode.window
                .showInputBox({
                    prompt: `The file (${correspondingFile}) does not exists yet. Create it?`
                })
                .then(answer => {
                    if (typeof answer === 'undefined') return; // User choose ESC

                    if (!fs.existsSync(correspondingPath)) {
                        // Create directory if it does not already exists
                        fs.mkdir(correspondingPath);
                    }

                    // Copy the file
                    fs.createReadStream(currentFile).pipe(fs.createWriteStream(correspondingFile));

                    // Open the file
                    vscode.workspace.openTextDocument(correspondingFile).then(doc => {
                        vscode.window.showTextDocument(doc, {
                            preview: false
                        });
                    });
                });
        }
    });

    context.subscriptions.push(openCorrespondingFile);
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
