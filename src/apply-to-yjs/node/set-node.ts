import { SetNodeOperation } from 'slate';
import { SharedDoc, SyncElement } from '../../model';
import { getTarget } from '../../path';

/**
 * Applies a setNode operation to a SharedDoc
 *
 * @param doc
 * @param op
 */
export default function setNode(
  doc: SharedDoc,
  op: SetNodeOperation
): SharedDoc {
  const node = getTarget(doc, op.path) as SyncElement;

  Object.entries(op.newProperties).forEach(([key, value]) => {
    if (key === 'children' || key === 'text') {
      throw new Error(`Cannot set the "${key}" property of nodes!`);
    }
    if (value == null) {
      node.delete(key);
    } else {
      node.set(key, value);
    }
    
  });

  Object.entries(op.properties).forEach(([key]) => {
    if (!op.newProperties.hasOwnProperty(key)) {
      node.delete(key);
    }
  });

  return doc;
}
