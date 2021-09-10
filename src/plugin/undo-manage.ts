import { UndoManager } from 'yjs';
import * as Y from 'yjs';
import { YjsEditor } from './yjs-editor';
import { absolutePositionToRelativePosition, relativePositionToAbsolutePosition } from '../cursor/utils';
import { BasePoint, Editor, Path, Transforms } from 'slate';

export interface YjsUndoEditor extends YjsEditor {
  undoManager: UndoManager;
  undo: () => void;
  redo: () => void;
}

export function withUndoManager<T extends YjsEditor>(
  editor: T,
  options = {
    trackedOrigins: [],
    captureTimeout: 300,
    deleteFilter: () => true
  }
): T & YjsUndoEditor {
  const e = editor as T & YjsUndoEditor;
  const { onChange } = e;
  let previousSelection: { anchorRelative: Y.RelativePosition, focusRelative: Y.RelativePosition } | null;
  const undoManager = new Y.UndoManager(e.sharedType, {
    ...options,
    trackedOrigins: new Set([editor].concat(options.trackedOrigins))
  });

  e.onChange = () => {
    if (!YjsEditor.isRemote(e)) {
      const lastOperation = e.operations[e.operations.length - 1];
      if (lastOperation && lastOperation.type === 'set_selection' && lastOperation.properties) {
        const { anchor, focus } = lastOperation.properties as any;
        const anchorRelative = anchor && absolutePositionToRelativePosition(e.sharedType, anchor);
        const focusRelative = focus && absolutePositionToRelativePosition(e.sharedType, focus);
        if (anchorRelative && focusRelative) {
          previousSelection = {
            anchorRelative,
            focusRelative
          };
        }
      }
    }
    onChange();
  };
  undoManager.on('stack-item-added', (event: any) => {
    if (event.changedParentTypes.has(e.sharedType) && previousSelection) {
      event.stackItem.meta.set(e, previousSelection);
      previousSelection = null;
    }
  });

  undoManager.on('stack-item-popped', (event: any) => {
    const selection = event.stackItem.meta.get(e);
    if (selection) {
      const anchor = relativePositionToAbsolutePosition(e.sharedType, selection.anchorRelative);
      const focus = relativePositionToAbsolutePosition(e.sharedType, selection.focusRelative);
      if (anchor?.path && focus?.path && Editor.hasPath(e, anchor.path as Path) && Editor.hasPath(e, focus.path as Path)) {
        Transforms.setSelection(e, {
          anchor: anchor as BasePoint,
          focus: focus as BasePoint
        });
      }
    }
  });
  e.undoManager = undoManager;

  e.undo = () => e.undoManager.undo();
  e.redo = () => e.undoManager.redo();

  return e;

}