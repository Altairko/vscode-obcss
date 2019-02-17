import { replaceTextInFile } from './file-system';
import { selectedTextStart, selectedTextEnd, activeFileName, showErrorMessage } from './editor';

export function replaceSelectionWith(text: string) {
  return replaceTextInFile(text, selectedTextStart(), selectedTextEnd(), activeFileName());
}

export const handleError = (e: Error) => {
  if (e) {
    showErrorMessage(e.message);
  }
};
