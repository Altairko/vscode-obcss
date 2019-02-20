import * as vscode from 'vscode';

export const activeEditor = (): vscode.TextEditor => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    throw new Error('No active editor available');
  }
  return editor;
};

export function selectedTextExpanded() {
  const rangeExpanded = new vscode.Range(selectedLineStart(), selectedLineEnd());
  const editor = activeEditor();
  return editor.document.getText(rangeExpanded);
}

export function selectedText() {
  const editor = activeEditor();
  return editor.document.getText(editor.selection);
}

export const activeFileName = () => {
  const activeTextEditor = activeEditor();
  return activeTextEditor.document.fileName;
};

export const selectedTextStart = () => {
  const activeTextEditor = activeEditor();
  return activeTextEditor.selection.start;
};

export const selectedTextEnd = () => {
  const activeTextEditor = activeEditor();
  return activeTextEditor.selection.end;
};

export const selectedLineStart = () => {
  const activeTextEditor = activeEditor();
  const { line } = activeTextEditor.selection.start;
  return new vscode.Position(line, 0);
};

export const selectedLineEnd = () => {
  const activeTextEditor = activeEditor();
  const { line, character } = activeTextEditor.selection.end;
  return new vscode.Position(character === 0 ? line : line + 1, 0);
};

export function getExpandedRange(): vscode.Range {
  return new vscode.Range(selectedLineStart(), selectedLineEnd());
}

export function updateSelection(range: vscode.Range) {
  const { start, end } = range;
  const nextSelection = new vscode.Selection(start.line, start.character, end.line, end.character);
  const editor = activeEditor();
  editor.selection = nextSelection;
}

export const showErrorMessage = (message: string) => vscode.window.showErrorMessage(message);
