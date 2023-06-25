import { Element, Node, Path, Text } from 'slate';
import * as Y from 'yjs';
import { CustomNode, SharedThemeType, SharedType, SyncElement } from '../model';
import { YArray } from 'yjs/dist/src/internals';

/**
 * Converts a sync element to a slate node
 *
 * @param element
 */
export function toSlateNode(element: SyncElement): Node {
  const text = SyncElement.getText(element);
  const children = SyncElement.getChildren(element);

  const node: Partial<CustomNode> = {};
  if (text !== undefined) {
    node.text = text.toString();
  }
  if (children !== undefined) {
    node.children = children.map(toSlateNode);
  }

  Array.from(element.entries()).forEach(([key, value]) => {
    if (key !== 'children' && key !== 'text') {
      node[key] = value;
    }
  });

  return node as Node;
}

/**
 * Converts a sync element to a slate node
 *
 * @param element
 */
export function toTheme(element: SyncElement): string | null {
  const theme = SyncElement.getTheme(element);
  if(theme){
    return theme.toJSON();
  }
  return null;
}

/**
 * Converts a SharedType to a Slate doc
 * @param doc
 */
export function toSlateContent(doc: SharedType): any {
  const content = doc.get('key');
  const children = content!.children.map(toSlateNode);
  let theme;
  if (content?.theme) {
    theme = toTheme(doc.get('key')?.theme!.toJSON());
  }
  if (theme) {
    return {
      children,
      theme
    };
  }
  return {
    children
  };
}

/**
 * Converts a slate node to a sync element
 *
 * @param node
 */
export function toSyncElement(node: Node): SyncElement {
  const element: SyncElement = new Y.Map();

  if (Element.isElement(node)) {
    const childElements = node.children.map(toSyncElement);
    const childContainer = new Y.Array();
    childContainer.insert(0, childElements);
    element.set('children', childContainer);
  }

  if (Text.isText(node)) {
    const textElement = new Y.Text(node.text);
    element.set('text', textElement);
  }

  Object.entries(node).forEach(([key, value]) => {
    if (key !== 'children' && key !== 'text') {
      element.set(key, value);
    }
  });

  return element;
}

export function toSyncTheme(value: string): SyncElement {
  const element: SyncElement = new Y.Map();

  const theme = new Y.Text(value);
  element.set('theme', theme);

  return element;
}

/**
 * Converts all elements int a Slate doc to SyncElements and adds them
 * to the SharedType
 *
 * @param sharedType
 * @param doc
 */
export function toSharedType(sharedType: SharedType, content: { children: Node[]; theme?: string }): void {
  // const doc = new Y.Doc();
  
  const children = new Y.Array<SyncElement>();
  children.insert(0, content.children.map(toSyncElement));
  
  let theme = new Y.Map<SharedThemeType>();
  if (content.theme) {
    theme.set('theme', toSyncTheme(content.theme));
  }
  sharedType.set('key', { children, theme });
}

/**
 * Converts a SharedType path the a slate path
 *
 * @param path
 */
export function toSlatePath(path: (string | number)[]): Path {
  return path.filter((node) => typeof node === 'number') as Path;
}
