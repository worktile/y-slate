import { InsertTextOperation } from 'slate';
import invariant from 'tiny-invariant';
import { SharedDoc, SyncElement } from '../../model';
import { getTarget } from '../../path';

/**
 * Applies a insert text operation to a SharedDoc.
 *
 * @param doc
 * @param op
 */
export default function insertText(
  doc: SharedDoc,
  op: InsertTextOperation
): SharedDoc {
  const node = getTarget(doc, op.path) as SyncElement;
  const nodeText = SyncElement.getText(node);

  invariant(nodeText, 'Apply text operation to non text node');

  nodeText.insert(op.offset, op.text);
  return doc;
}
