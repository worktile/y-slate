import { InsertNodeOperation } from 'slate';
import invariant from 'tiny-invariant';
import { SharedDoc, SyncNode } from '../../model';
import { getParent } from '../../path';
import { toSyncElement } from '../../utils/convert';

/**
 * Applies an insert node operation to a SharedDoc.
 *
 * @param doc
 * @param op
 */
export default function insertNode(
  doc: SharedDoc,
  op: InsertNodeOperation
): SharedDoc {
  const [parent, index] = getParent(doc, op.path);

  const children = SyncNode.getChildren(parent);
  if (SyncNode.getText(parent) !== undefined || !children) {
    throw new TypeError('Can\'t insert node into text node');
  }

  invariant(children, 'cannot apply insert node operation to text node');

  children.insert(index, [toSyncElement(op.node)]);
  return doc;
}
