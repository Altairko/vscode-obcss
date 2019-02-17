// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { objToCss } from './modules/obj-to-css';
import { cssToObj } from './modules/css-to-obj';

export function activate(context: vscode.ExtensionContext) {
  const objectToCss = vscode.commands.registerCommand('extension.obcss.obj-to-css', objToCss);
  const cssToObject = vscode.commands.registerCommand('extension.obcss.css-to-obj', cssToObj);

  context.subscriptions.push(objectToCss);
  context.subscriptions.push(cssToObject);
}

// this method is called when your extension is deactivated
export function deactivate() {}
