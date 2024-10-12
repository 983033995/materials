import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('mylib.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from MyLib VSCode Plugin!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}