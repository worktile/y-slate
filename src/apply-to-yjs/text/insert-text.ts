// import invariant from 'tiny-invariant';
import { SharedType } from '../../model';
// import { getTarget } from '../../path';

/**
 * Applies a insert text operation to a SharedType.
 *
 * @param doc
 * @param op
 */
export default function insertText(
  doc: SharedType,
): SharedType {
  // const node = getTarget(doc, op.path) as SyncElement;
  // const nodeText = SyncElement.getText(node);

  // invariant(nodeText, 'Apply text operation to non text node');

  // nodeText.insert(op.offset, op.text);
  return doc;
}
