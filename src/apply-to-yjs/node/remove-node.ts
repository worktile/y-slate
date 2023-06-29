import { RemoveNodeOperation } from 'slate';
import invariant from 'tiny-invariant';
import { SharedDoc, SyncNode } from '../../model';
import { getParent } from '../../path';

/**
 * Applies a remove node operation to a SharedDoc.
 *
 * @param doc
 * @param op
 */
export default function removeNode(
  doc: SharedDoc,
  op: RemoveNodeOperation
): SharedDoc {
  const [parent, index] = getParent(doc, op.path);

  if (SyncNode.getText(parent) !== undefined) {
    throw new TypeError('Can\'t insert node into text node');
  }

  const children = SyncNode.getChildren(parent);
  invariant(children, 'Parent should have children');
  children.delete(index);

  return doc;
}
