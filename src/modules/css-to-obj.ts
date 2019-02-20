import mapping, { Mapping } from '../mapping';
import { trim, map } from 'lodash';
import { selectedTextExpanded, getExpandedRange, updateSelection } from '../editor';
import { handleError, replaceText } from '../code-actions';

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
    const expandedRange = getExpandedRange();
    const result = convertCSSToJS(selectedTextExpanded());
    await replaceText(expandedRange, result);
    updateSelection(expandedRange);
    // Comment: below is the old code inspired from vscode-glean extension:
    // const selectionProccessingResult = convertCSSToJS(selectedText());
    // await persistFileSystemChanges(replaceSelectionWith(selectionProccessingResult));
  } catch (e) {
    handleError(e);
  }
}
