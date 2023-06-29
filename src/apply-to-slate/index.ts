import { Editor } from 'slate';
import * as Y from 'yjs';
import translateArrayEvent from './array-event';
import translateMapEvent from './map-event';
import translateTextEvent from './text-event';
import { MergeOperation } from '../apply-to-yjs/types';
import { YjsEditor } from '../plugin';

/**
 * Translates a Yjs event into slate editor operations.
 *
 * @param event
 */
export function translateYjsEvent(
  editor: Editor,
  event: Y.YEvent
): MergeOperation[] {
  if (event instanceof Y.YArrayEvent) {
    return translateArrayEvent(editor, event);
  }

  if (event instanceof Y.YMapEvent) {
    return translateMapEvent(editor, event);
  }

  if (event instanceof Y.YTextEvent) {
    return translateTextEvent(editor, event);
  }

  throw new Error('Unsupported yjs event');
}

/**
 * Applies multiple yjs events to a slate editor.
 *
 * @param event
 */
export function applyYjsEvents(editor: YjsEditor, events: Y.YEvent[]): void {
  Editor.withoutNormalizing(editor, () => {
    events.forEach((event) =>
      translateYjsEvent(editor, event).forEach(editor.apply as any)
    );
  });
}
