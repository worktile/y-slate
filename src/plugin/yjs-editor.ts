import { Descendant, Editor, Operation } from 'slate';
import invariant from 'tiny-invariant';
import * as Y from 'yjs';
import { applyYjsEvents } from '../apply-to-slate';
import { SharedDoc, SharedTheme, ThemeType } from '../model';
import { toSlateDoc, toSlateTheme } from '../utils/convert';
import { MergeOperation } from '../apply-to-yjs/types';
import { ThemeOperation } from '../apply-to-yjs/theme/set-theme';
import applySlateOp from '../apply-to-yjs';

const IS_REMOTE: WeakSet<Editor> = new WeakSet();
const IS_LOCAL: WeakSet<Editor> = new WeakSet();
const IS_UNDO: WeakSet<Editor> = new WeakSet();
const SHARED_DOCS: WeakMap<Editor, SharedDoc> = new WeakMap();
const SHARED_THEME: WeakMap<Editor, SharedTheme> = new WeakMap();

export interface YjsEditor extends Editor {
  sharedDoc: SharedDoc;
  sharedTheme?: SharedTheme;
  theme?: ThemeType;
}

export const YjsEditor = {
  /**
   * Set the editor value to the content of the to the editor bound shared type.
   */
  synchronizeValue: (e: YjsEditor): void => {
    Editor.withoutNormalizing(e, () => {
      e.children = toSlateDoc(e.sharedDoc);
      if (e.sharedTheme) {
        e.theme = toSlateTheme(e.sharedTheme) as ThemeType;
      }
      e.onChange();
    });
  },

  /**
   * Returns whether the editor currently is applying remote changes.
   */
  sharedDoc: (editor: YjsEditor): SharedDoc => {
    const SharedDoc = SHARED_DOCS.get(editor);
    invariant(SharedDoc, 'YjsEditor without attached shared doc');
    return SharedDoc;
  },

  /**
   * Returns whether the editor currently is applying remote changes.
   */
  sharedTheme: (editor: YjsEditor): SharedTheme => {
    const sharedTheme = SHARED_THEME.get(editor);
    invariant(sharedTheme, 'YjsEditor without attached shared theme');
    return sharedTheme;
  },

  /**
   * Applies a slate operations to the bound shared type.
   */
  applySlateOperations: (editor: YjsEditor, operations: MergeOperation[]): void => {
    YjsEditor.asLocal(editor, () => {
      try {
        operations.map((operation) => {
          if (operation.type === 'set_theme') {
            applySlateOp(YjsEditor.sharedTheme(editor), operation as ThemeOperation, editor);
          } else {
            applySlateOp(YjsEditor.sharedDoc(editor), operation as Operation, editor);
          }
        });
      } catch (error) {
        const e: YjsEditor & {
          onError: (errorData: { code?: number; name?: string; nativeError?: any; data?: Descendant[] }) => void;
        } = editor as any;
        if (e.onError) {
          e.onError({ code: 10000, name: 'apply local operations', nativeError: error });
        }
      }
    });
  },

  /**
   * Returns whether the editor currently is applying remote changes.
   */
  isRemote: (editor: YjsEditor): boolean => {
    return IS_REMOTE.has(editor);
  },

  /**
   * Performs an action as a remote operation.
   */
  asRemote: (editor: YjsEditor, fn: () => void): void => {
    const wasRemote = YjsEditor.isRemote(editor);
    IS_REMOTE.add(editor);

    fn();

    if (!wasRemote) {
      Promise.resolve().then(() => IS_REMOTE.delete(editor));
    }
  },

  /**
   * Returns whether the editor currently is applying remote changes.
   */
  isUndo: (editor: YjsEditor): boolean => {
    return IS_UNDO.has(editor);
  },

  /**
   * Performs an action as a remote operation.
   */
  asUndo: (editor: YjsEditor, fn: () => void): void => {
    const wasUndo = YjsEditor.isUndo(editor);
    IS_UNDO.add(editor);

    fn();

    if (!wasUndo) {
      Promise.resolve().then(() => IS_UNDO.delete(editor));
    }
  },

  /**
   * Apply Yjs events to slate
   */
  applyYjsEvents: (editor: YjsEditor, events: Y.YEvent[]): void => {
    if (YjsEditor.isUndo(editor)) {
      try {
        applyYjsEvents(editor, events);
      } catch (error) {
        const e: YjsEditor & {
          onError: (errorData: { code?: number; name?: string; nativeError?: any; data?: Descendant[] }) => void;
        } = editor as any;
        if (e.onError) {
          e.onError({ code: 10001, name: 'apply yjs undo events', nativeError: error });
        }
      }
    } else {
      YjsEditor.asRemote(editor, () => {
        try {
          applyYjsEvents(editor, events);
        } catch (error) {
          const e: YjsEditor & {
            onError: (errorData: { code?: number; name?: string; nativeError?: any; data?: Descendant[] }) => void;
          } = editor as any;
          if (e.onError) {
            e.onError({ code: 10002, name: 'apply yjs remote events', nativeError: error });
          }
        }
      });
    }
  },

  /**
   * Performs an action as a local operation.
   */
  asLocal: (editor: YjsEditor, fn: () => void): void => {
    const wasLocal = YjsEditor.isLocal(editor);
    IS_LOCAL.add(editor);

    fn();

    if (!wasLocal) {
      IS_LOCAL.delete(editor);
    }
  },

  /**
   * Returns whether the editor currently is applying a remote change to the yjs doc.
   */
  isLocal: (editor: YjsEditor): boolean => {
    return IS_LOCAL.has(editor);
  }
};

export function withYjs<T extends Editor>(
  editor: T,
  sharedDoc: SharedDoc,
  sharedTheme?: SharedTheme,
  { isSynchronizeValue = true }: WithYjsOptions = {}
): T & YjsEditor {
  const e = editor as T & YjsEditor;
  let isInitialized = false;

  e.sharedDoc = sharedDoc;
  SHARED_DOCS.set(editor, sharedDoc);

  if (isSynchronizeValue) {
    setTimeout(() => {
      YjsEditor.synchronizeValue(e);
      isInitialized = true;
    });
  }

  sharedDoc.observeDeep((events) => {
    if (!YjsEditor.isLocal(e)) {
      const isNormalizing = Editor.isNormalizing(editor);
      Editor.setNormalizing(e, false);
      if (!isInitialized) {
        e.children = e.sharedDoc.toJSON();
        if (sharedTheme) {
          e.theme = e.sharedTheme!.get('theme').toJSON();
        }
        e.onChange();
        isInitialized = true;
      } else {
        YjsEditor.applyYjsEvents(e, events);
      }
      Editor.setNormalizing(e, isNormalizing);
    }
  });

  if (sharedTheme && e.theme) {
    e.sharedTheme = sharedTheme;
    SHARED_THEME.set(editor, sharedTheme);
    sharedTheme.observeDeep((events) => {
      if (!YjsEditor.isLocal(e)) {
        const isNormalizing = Editor.isNormalizing(editor);
        Editor.setNormalizing(e, false);
        if (isInitialized) {
          YjsEditor.applyYjsEvents(e, events);
        }
        Editor.setNormalizing(e, isNormalizing);
      }
    });
  }

  const { onChange } = editor;

  e.onChange = () => {
    if (!YjsEditor.isRemote(e) && !YjsEditor.isUndo(e) && isInitialized) {
      YjsEditor.applySlateOperations(e, e.operations);
    }
    onChange();
  };

  return e;
}

export type WithYjsOptions = {
  isSynchronizeValue?: boolean;
};
