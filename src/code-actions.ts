import * as vscode from 'vscode';
import { replaceTextInFile } from './file-system';
import {
  selectedTextStart,
  selectedTextEnd,
  activeFileName,
  showErrorMessage,
  activeEditor
} from './editor';

export function replaceSelectionWith(text: string) {
  return replaceTextInFile(text, selectedTextStart(), selectedTextEnd(), activeFileName());
}

export const handleError = (e: Error) => {
  if (e) {
    showErrorMessage(e.message);
  }
};

export function replaceText(range: vscode.Range, text: string): Thenable<boolean> {
  const editor = activeEditor();
  return editor.edit(e => e.replace(range, text));
}
