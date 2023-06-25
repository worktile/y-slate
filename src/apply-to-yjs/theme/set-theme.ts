import { SharedType } from '../../model';
import { YjsEditor } from '../../plugin';

export interface SetThemeOperation {
  type: 'set_theme';
  properties: Partial<string>;
  newProperties: Partial<string>;
}

/**
 * Applies a setNode operation to a SharedType
 *
 * @param doc
 * @param op
 */
export default function setTheme(doc: SharedType, op: SetThemeOperation, editor: YjsEditor): SharedType {
  Object.entries(op.newProperties).forEach(([, value]) => {
    if (value == null) {
      // node.delete(key);
      editor.theme = value;
    }
  });
  return doc;
}
