import { NodeEntry, Range } from 'slate';
import { Cursor, CursorInfo } from '../model';
import { relativePositionToAbsolutePosition } from '../cursor/utils';
import { CursorEditor } from './cursor-editor';
import { Subject } from 'rxjs';

export const useCursors = (
  editor: CursorEditor
): Subject<{
    decorate: (entry: NodeEntry) => Range[];
    cursors: Cursor[];
  }> => {
  let decorate$ = new Subject<{decorate: (entry: NodeEntry) => Range[], cursors:Cursor[]}>();
  let cursors: Cursor[] = [];

  editor.awareness.on('update', () => {
    cursors = Array.from(editor.awareness.getStates())
      .filter(([clientId]) => clientId !== editor.sharedDoc.doc?.clientID)
      .map(([, awareness]) => {
        let anchor = null;
        let focus = null;

        if (awareness.anchor) {
          anchor = relativePositionToAbsolutePosition(
            editor.sharedDoc,
            awareness.anchor
          );
        }

        if (awareness.focus) {
          focus = relativePositionToAbsolutePosition(
            editor.sharedDoc,
            awareness.focus
          );
        }

        return { anchor, focus, data: awareness };
      })
      .filter((cursor) => cursor.anchor && cursor.focus) as Cursor[];
    
    const decorate = ([, path]: NodeEntry) => {
      const ranges: (Range & CursorInfo)[] = [];
      if (path && path.length === 1 && cursors?.length) {
        cursors.forEach((cursor) => {
          if (Range.includes(cursor, path)) {
            const { focus, anchor, data } = cursor;

            const isForward = Range.isForward({ anchor, focus });

            ranges.push({
              data,
              isForward,
              originAnchorPath: anchor.path,
              originFocusPath: focus.path,
              anchor,
              focus
            });
          }
        });
      }
      return ranges;
    };
    decorate$.next({
      decorate,
      cursors
    });
  });
  return decorate$;
};

export default useCursors;
