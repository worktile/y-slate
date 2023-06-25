import { Element, Node, Path, Text } from 'slate';
import * as Y from 'yjs';
import { CustomNode, DeltaInsert, InsertDelta, SharedType, SyncElement, ThemeType } from '../model';
import { getProperties } from './slate';
import { yTextToInsertDelta } from './delta';

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
 * Converts a SharedType to a Slate doc
 * @param doc
 */
export function toSlateDoc(doc: SharedType) {
  console.log(doc);
  // return doc.map(toSlateNode);
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

/**
 * Converts all elements int a Slate doc to SyncElements and adds them
 * to the SharedType
 *
 * @param sharedType
 * @param doc
 */
// export function toSharedType(sharedType: SharedType, doc: Node[]): void {
//   // sharedType.insert(0, doc.map(toSyncElement));
// }

/**
 * Converts a SharedType path the a slate path
 *
 * @param path
 */
export function toSlatePath(path: (string | number)[]): Path {
  return path.filter((node) => typeof node === 'number') as Path;
}

export function yTextToSlateElement(yText: Y.XmlText): { node?: Element; theme?: string } {
  const delta = yTextToInsertDelta(yText);
  let children: Node[] = [{ text: '' }];
  let theme = null;
  if (delta.length > 0) {
    theme = deltaInsertToTheme(delta);
    if (!theme) {
      children = delta.map(deltaInsertToSlateNode) as Node[];
    }
  } else {
    children = [{ text: '' }];
  }
  if (theme) {
    return { theme };
  }
  return { node: { ...yText.getAttributes(), children } };
}

export function deltaInsertToSlateNode(insert: DeltaInsert) {
  if (typeof insert.insert === 'string') {
    return { ...insert.attributes, text: insert.insert };
  }

  return yTextToSlateElement(insert.insert as Y.XmlText);
}

export function deltaInsertToTheme(delta: InsertDelta): string | null | undefined {
  const themeDelta = delta
    .map((item) => {
      if ((item.insert as ThemeType).theme) {
        return (item.insert as ThemeType).theme;
      }
      return null;
    })
    .filter((item) => item);
  if (themeDelta.length) {
    return themeDelta[0];
  }
  return null;
}

export function slateNodesToInsertDelta(nodes: Node[]): InsertDelta {
  return nodes.map((node) => {
    if (Text.isText(node)) {
      return { insert: node.text, attributes: getProperties(node) };
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return { insert: slateElementToYText(node) };
  });
}

export function nodesToInsertDelta(value: { children?: Node[]; theme?: string }): InsertDelta {
  let themeDelta: InsertDelta = [];
  let nodeDelta: InsertDelta = [];
  if (value.children) {
    nodeDelta = value.children.map((node) => {
      if (Text.isText(node)) {
        return { insert: node.text, attributes: getProperties(node) };
      }

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return { insert: slateElementToYText(node) };
    });
  }

  if (value.theme) {
    themeDelta = [{ insert: themeToYText(value.theme) }];
  }

  return [...nodeDelta, ...themeDelta];
}

export function slateElementToYText({ children, ...attributes }: Element): Y.XmlText {
  const yElement = new Y.XmlText();

  Object.entries(attributes).forEach(([key, value]) => {
    yElement.setAttribute(key, value);
  });

  yElement.applyDelta(nodesToInsertDelta({ children }), { sanitize: false });
  return yElement;
}

export function themeToYText(theme: string): Y.XmlText {
  const yElement = new Y.XmlText();
  yElement.applyDelta([{ insert: { theme } }], { sanitize: false });
  return yElement;
}
