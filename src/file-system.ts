import * as vscode from 'vscode';

export const replaceTextInFile = (
  text: string,
  start: vscode.Position,
  end: vscode.Position,
  path: any
) => (edit: any) => edit.replace(vscode.Uri.file(path), new vscode.Range(start, end), text);

export function persistFileSystemChanges(...changes: any[]) {
  const accumulatedEdit = new vscode.WorkspaceEdit();
  changes.forEach(addChangeTo => addChangeTo(accumulatedEdit));
  return vscode.workspace.applyEdit(accumulatedEdit);
}
