const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let fileSystemWatcher = vscode.workspace.createFileSystemWatcher(
        "**/_posts/*.{png,jpg,jpeg,gif,webp}"
    );

    fileSystemWatcher.onDidCreate(async (uri) => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor || path.extname(editor.document.fileName) !== '.md') {
                return;
            }

            const postDir = path.dirname(editor.document.fileName);
            const assetsDir = path.resolve(postDir, '../assets/images');

            // Create assets directory if it doesn't exist
            if (!fs.existsSync(assetsDir)) {
                fs.mkdirSync(assetsDir, { recursive: true });
            }

            const fileName = path.basename(uri.fsPath);
            const newPath = path.join(assetsDir, fileName);

            // Copy the image instead of moving it
            await new Promise((resolve, reject) => {
                fs.copyFile(uri.fsPath, newPath, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            // Update the markdown link in the editor
            const document = editor.document;
            const text = document.getText();
            const newRelativePath = path.relative(postDir, newPath)
                .split(path.sep)
                .join('/');

            const edit = new vscode.WorkspaceEdit();
            const imageRegex = new RegExp(`!\\[.*?\\]\\(${fileName}\\)`, 'g');
            
            let match;
            while ((match = imageRegex.exec(text)) !== null) {
                const range = new vscode.Range(
                    document.positionAt(match.index),
                    document.positionAt(match.index + match[0].length)
                );
                const newText = match[0].replace(fileName, newRelativePath);
                edit.replace(document.uri, range, newText);
            }

            await vscode.workspace.applyEdit(edit);
            
            vscode.window.setStatusBarMessage('Image copied successfully! ✨', 3000);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to process image: ${error.message}`);
        }
    });

    context.subscriptions.push(fileSystemWatcher);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};