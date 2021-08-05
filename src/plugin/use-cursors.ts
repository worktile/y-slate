import { NodeEntry, Path, Range, Text } from 'slate';
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
      .filter(([clientId]) => clientId !== editor.sharedType.doc?.clientID)
      .map(([, awareness]) => {
        let anchor = null;
        let focus = null;

        if (awareness.anchor) {
          anchor = relativePositionToAbsolutePosition(
            editor.sharedType,
            awareness.anchor
          );
        }

        if (awareness.focus) {
          focus = relativePositionToAbsolutePosition(
            editor.sharedType,
            awareness.focus
          );
        }

        return { anchor, focus, data: awareness };
      })
      .filter((cursor) => cursor.anchor && cursor.focus) as Cursor[];
    
    const decorate = ([node, path]: NodeEntry) => {
      const ranges: (Range & CursorInfo)[] = [];
      if (Text.isText(node) && cursors?.length) {
        cursors.forEach((cursor) => {
          if (Range.includes(cursor, path)) {
            const { focus, anchor, data } = cursor;

            const isFocusNode = Path.equals(focus.path, path);
            const isAnchorNode = Path.equals(anchor.path, path);
            const isForward = Range.isForward({ anchor, focus });

            ranges.push({
              data,
              isForward,
              isCaret: isFocusNode,
              anchor: {
                path,
                // eslint-disable-next-line no-nested-ternary
                offset: isAnchorNode
                  ? anchor.offset
                  : isForward
                    ? 0
                    : node.text.length
              },
              focus: {
                path,
                // eslint-disable-next-line no-nested-ternary
                offset: isFocusNode
                  ? focus.offset
                  : isForward
                    ? node.text.length
                    : 0
              }
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
