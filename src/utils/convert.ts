import { Element, Node, Path, Text } from 'slate';
import * as Y from 'yjs';
import { CustomNode, SharedDoc, SharedTheme, SyncElement, ThemeType } from '../model';

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
 * Converts a SharedDoc to a Slate doc
 * @param doc
 */
export function toSlateDoc(doc: SharedDoc): Node[] {
  return doc.map(toSlateNode);
}

export function toSlateTheme(sharedTheme: SharedTheme) {
  const themeValue = sharedTheme.get('theme');
  const theme = SyncElement.getTheme(themeValue!);
  const node: Partial<ThemeType> = {};
  if (theme !== undefined) {
    node.themeColorMode = theme.toString();
  }
  return node;
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

export function toSyncTheme(theme: ThemeType): SyncElement {
  const element: SyncElement = new Y.Map();
  const themeContent = new Y.Text(theme.themeColorMode);
  element.set('themeColorMode', themeContent);
  return element;
}


export function toSharedContent(
  sharedDoc: SharedDoc,
  doc: Node[],
  sharedTheme?: SharedTheme,
  theme?: ThemeType
): void {
  sharedDoc.insert(0, doc.map(toSyncElement));
  if (sharedTheme && theme) {
    sharedTheme.set('theme', toSyncTheme(theme));
  }
}

/**
 * Converts a SharedDoc path the a slate path
 *
 * @param path
 */
export function toSlatePath(path: (string | number)[]): Path {
  return path.filter((node) => typeof node === 'number') as Path;
}
