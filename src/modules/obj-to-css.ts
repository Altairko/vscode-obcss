import mapping, { Mapping } from '../mapping';
import { trim, map, toNumber, isNaN } from 'lodash';
import { getExpandedRange, selectedTextExpanded, updateSelection } from '../editor';
import { handleError, replaceText } from '../code-actions';

function getCSSKey(jsKey: string): string {
  const value = (mapping as Mapping).jsToCss[jsKey];
  if (!value) {
    throw new Error(`We could not parse "${jsKey}"`);
  }
  return value;
}

function getCSSValue(value: string): string {
  let nextValue = value.replace(/["']/g, '');
  const isNumberValue = !isNaN(toNumber(nextValue));
  return isNumberValue ? `${nextValue}px` : nextValue;
}

function convertJSToCSS(text: string): string {
  let cssOutput = '';
  const text1 = trim(text)
    .slice(0, -1)
    .split(',');
  const pairs = map(text1, trim);

  pairs.forEach(t => {
    const split = map(t.split(':'), trim);
    const key = getCSSKey(split[0]);
    const value = getCSSValue(split[1]);

    cssOutput += `${key}: ${value};\n`;
  });

  return cssOutput;
}

export async function objToCss() {
  try {
    const expandedRange = getExpandedRange();
    const result = convertJSToCSS(selectedTextExpanded());
    await replaceText(expandedRange, result);
    updateSelection(expandedRange);
    // Comment: below is the old code inspired from vscode-glean extension:
    // const selectionProccessingResult = convertJSToCSS(selectedText());
    // await persistFileSystemChanges(replaceSelectionWith(selectionProccessingResult));
  } catch (e) {
    handleError(e);
  }
}
