import { SetNodeOperation } from 'slate';
import { SharedType, SyncElement } from '../../model';
import { getTarget } from '../../path';

/**
 * Applies a setNode operation to a SharedType
 *
 * @param doc
 * @param op
 */
export default function setNode(
  doc: SharedType,
  op: SetNodeOperation
): SharedType {
  const node = getTarget(doc, op.path) as SyncElement;

  Object.entries(op.newProperties).forEach(([key, value]) => {
    if (key === 'children') {
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
