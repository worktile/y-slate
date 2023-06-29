import { Editor, Node, NodeOperation } from 'slate';
import * as Y from 'yjs';
import { SyncElement } from '../model';
import { toSlatePath } from '../utils/convert';
import { ThemeOperation } from '../apply-to-yjs/theme/set-theme';

/**
 * Translates a Yjs map event into a slate operations.
 *
 * @param event
 */
export default function translateMapEvent(
  editor: Editor,
  event: Y.YMapEvent<unknown>
): (NodeOperation | ThemeOperation)[] {
  const targetPath = toSlatePath(event.path);
  const targetSyncElement = event.target as SyncElement;
  const targetElement = Node.get(editor, targetPath);

  const keyChanges = Array.from(event.changes.keys.entries());
  const newProperties = Object.fromEntries(
    keyChanges.map(([key, info]) => [key, info.action === 'delete' ? null : targetSyncElement.get(key)])
  );

  const properties = Object.fromEntries(keyChanges.map(([key]) => [key, targetElement[key]]));

  if (properties.theme) {
    return [
      {
        type: 'set_theme',
        newProperties: newProperties.theme.toJSON(),
        properties: properties.theme
      }
    ];
  }

  return [{ type: 'set_node', newProperties, properties, path: targetPath }];
}
