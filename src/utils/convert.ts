import { Element, Node, Path, Text } from 'slate';
import * as Y from 'yjs';
import { CustomNode, SharedType, SyncElement } from '../model';

/**
 * Converts a sync element to a slate node
 *
 * @param element
 */
export function toSlateNode(element: SyncElement): Node {
  const text = SyncElement.getText(element);
  const children = SyncElement.getChildren(element);

  const node: Partial<CustomNode> = {};
  if (text !== undefined && text instanceof Y.Text) {
    node.text = text.toString();
  }
  if (children !== undefined) {
    node.children = children.map(toSlateNode);
  }

  Array.from(element.entries()).forEach(([key, value]) => {
    if (key !== 'children' &&  (key !== 'text' || (key ==='text' && !(value instanceof Y.Text)))) {
      node[key] = value;
    }
  });

  return node as Node;
}

/**
 * Converts a SharedType to a Slate doc
 * @param doc
 */
export function toSlateDoc(doc: SharedType): Node[] {
  return doc.map(toSlateNode);
}

/**
 * Converts a slate node to a sync element
 *
 * @param node
 */
export function toSyncElement(node: Node): SyncElement {
  const element: SyncElement = new Y.Map();
  let hasSetText = false;

  if (Element.isElement(node)) {
    const childElements = node.children.map(toSyncElement);
    const childContainer = new Y.Array();
    childContainer.insert(0, childElements);
    element.set('children', childContainer);
  }

  if (isSlateText(node)) {
    const textElement = new Y.Text(node.text);
    element.set('text', textElement);
    hasSetText = true;
  }

  Object.entries(node).forEach(([key, value]) => {
    if (key !== 'children' && (!hasSetText || key !=='text')) {
      element.set(key, value);
    }
  });

  return element;
}

export const isSlateText = (node: Node): node is Text => {
  return Text.isText(node) && typeof node.text === 'string';
};

/**
 * Converts all elements int a Slate doc to SyncElements and adds them
 * to the SharedType
 *
 * @param sharedType
 * @param doc
 */
export function toSharedType(sharedType: SharedType, doc: Node[]): void {
  sharedType.insert(0, doc.map(toSyncElement));
}

/**
 * Converts a SharedType path the a slate path
 *
 * @param path
 */
export function toSlatePath(path: (string | number)[]): Path {
  return path.filter((node) => typeof node === 'number') as Path;
}
