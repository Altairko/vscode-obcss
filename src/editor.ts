import * as vscode from 'vscode';

export function selectedText() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw new Error('There no editor available');
  }
  const selection = editor.selection;
  return editor.document.getText(selection);
}

export const activeFileName = () => {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (!activeTextEditor) {
    throw new Error('There is no active text editor');
  }
  return activeTextEditor.document.fileName;
};

export const selectedTextStart = () => {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (!activeTextEditor) {
    throw new Error('There is no active text editor');
  }
  return activeTextEditor.selection.start;
};

export const selectedTextEnd = () => {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (!activeTextEditor) {
    throw new Error('There is no active text editor');
  }
  return activeTextEditor.selection.end;
};

export const activeEditor = () => vscode.window.activeTextEditor;

export const showErrorMessage = (message: string) => vscode.window.showErrorMessage(message);
