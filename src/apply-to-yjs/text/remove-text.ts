import { RemoveTextOperation } from 'slate';
import { SharedDoc, SyncElement } from '../../model';
import { getTarget } from '../../path';

/**
 * Applies a remove text operation to a SharedDoc.
 *
 * @param doc
 * @param op
 */
export default function removeText(
  doc: SharedDoc,
  op: RemoveTextOperation
): SharedDoc {
  const node = getTarget(doc, op.path) as SyncElement;
  const nodeText = SyncElement.getText(node)!;
  nodeText.delete(op.offset, op.text.length);
  return doc;
}
