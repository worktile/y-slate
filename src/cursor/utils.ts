import { Point } from 'slate';
import invariant from 'tiny-invariant';
import * as Y from 'yjs';
import { SharedType, SyncNode } from '../model';
import { getSyncNodePath, getTarget } from '../path';

export function absolutePositionToRelativePosition(
  sharedType: SharedType,
  point: Point
): Y.RelativePosition {
  const target = getTarget(sharedType, point.path);
  const text = SyncNode.getFirstText(target);
  invariant(text, 'Slate point should point to Text node');
  const offset = point.offset >= 0 ? point.offset : 0;
  return Y.createRelativePositionFromTypeIndex(text, offset);
}

export function relativePositionToAbsolutePosition(
  sharedType: SharedType,
  relativePosition: Y.RelativePosition
): Point | null {
  invariant(sharedType.doc, 'Shared type should be bound to a document');

  const pos = Y.createAbsolutePositionFromRelativePosition(
    relativePosition,
    sharedType.doc
  );

  if (!pos) {
    return null;
  }

  return {
    path: getSyncNodePath(pos.type.parent as SyncNode),
    offset: pos.index
  };
}
