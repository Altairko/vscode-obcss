import mapping, { Mapping } from '../mapping';
import { trim, map } from 'lodash';
import { selectedText } from '../editor';
import { persistFileSystemChanges } from '../file-system';
import { replaceSelectionWith, handleError } from '../code-actions';

function getJSKey(cssKey: string): string {
  const value = (mapping as Mapping).cssToJs[cssKey];
  if (!value) {
    throw new Error(`We could not parse "${cssKey}"`);
  }
  return value;
}

function convertCSSToJS(text: string): string {
  let jsOutput = '';
  const text1 = trim(text)
    .slice(0, -1)
    .split(';');
  const pairs = map(text1, trim);

  pairs.forEach((t: string) => {
    const split = map(t.split(':'), trim);
    jsOutput += `${getJSKey(split[0])}: '${split[1]}',\n`;
  });

  return jsOutput;
}

export async function cssToObj() {
  try {
    const selectionProccessingResult = convertCSSToJS(selectedText());
    await persistFileSystemChanges(replaceSelectionWith(selectionProccessingResult));
  } catch (e) {
    handleError(e);
  }
}
