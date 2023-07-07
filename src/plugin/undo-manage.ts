import { UndoManager } from 'yjs';
import * as Y from 'yjs';
import { YjsEditor } from './yjs-editor';
import { absolutePositionToRelativePosition, relativePositionToAbsolutePosition } from '../cursor/utils';
import { BasePoint, Descendant, Editor, Path, Transforms } from 'slate';

export interface YjsUndoEditor extends YjsEditor {
  undoManager: UndoManager;
  undo: () => void;
  redo: () => void;
}

export function withUndoManager<T extends YjsEditor>(
  editor: T,
  typeScope: Y.AbstractType<any> | Y.AbstractType<any>[] = editor.sharedType,
  options = {
    trackedOrigins: [],
    captureTimeout: 300,
    deleteFilter: () => true
  }
): T & YjsUndoEditor {
  const e = editor as T & YjsUndoEditor;
  const { onChange } = e;
  let previousSelection: { anchorRelative: Y.RelativePosition, focusRelative: Y.RelativePosition } | null;
  const undoManager = new Y.UndoManager(typeScope, {
    ...options,
    trackedOrigins: new Set([editor].concat(options.trackedOrigins))
  });

  e.onChange = () => {
    onChange();
    if (!YjsEditor.isRemote(e)) {
      try {
        const lastOperation = e.operations[e.operations.length - 1];
        if (lastOperation && lastOperation.type === 'set_selection' && lastOperation.newProperties) {
          const { anchor, focus } = lastOperation.newProperties as any;
          const anchorRelative = anchor && absolutePositionToRelativePosition(e.sharedType, anchor);
          const focusRelative = focus && absolutePositionToRelativePosition(e.sharedType, focus);
          if (anchorRelative && focusRelative) {
            previousSelection = {
              anchorRelative,
              focusRelative
            };
          }
        }
      } catch (error) {
        const e: YjsEditor & {
          onError: (errorData: {
            code?: number,
            name?: string,
            nativeError?: any,
            data?: Descendant[]
          }) => void
        } = editor as any;
        if (e.onError) {
          e.onError({ code: 10004, name: 'get previous relative', nativeError: error });
        }
      }
    }
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

  e.undo = () => {
    YjsEditor.asUndo(e, () => {
      e.undoManager.undo();
    });
    Promise.resolve().then(() => Editor.normalize(editor));
  };
  e.redo = () => {
    YjsEditor.asUndo(e, () => {
      e.undoManager.redo();
    });
    Promise.resolve().then(() => Editor.normalize(editor));
  };

  return e;

}