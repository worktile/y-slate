import { Point } from 'slate';
import invariant from 'tiny-invariant';
import * as Y from 'yjs';
import { SharedDoc, SyncNode } from '../model';
import { getSyncNodePath, getTarget } from '../path';

export function absolutePositionToRelativePosition(
  SharedDoc: SharedDoc,
  point: Point
): Y.RelativePosition {
  const target = getTarget(SharedDoc, point.path);
  const text = SyncNode.getFirstText(target);
  invariant(text, 'Slate point should point to Text node');
  const offset = point.offset >= 0 ? point.offset : 0;
  return Y.createRelativePositionFromTypeIndex(text, offset);
}

export function relativePositionToAbsolutePosition(
  SharedDoc: SharedDoc,
  relativePosition: Y.RelativePosition
): Point | null {
  invariant(SharedDoc.doc, 'Shared type should be bound to a document');

  const pos = Y.createAbsolutePositionFromRelativePosition(
    relativePosition,
    SharedDoc.doc
  );

  if (!pos) {
    return null;
  }

  return {
    path: getSyncNodePath(pos.type.parent as SyncNode),
    offset: pos.index
  };
}
