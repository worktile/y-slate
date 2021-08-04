import { Descendant, Range } from 'slate';
import * as Y from 'yjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SyncElement = Y.Map<any>;
export type SharedType = Y.Array<SyncElement>;
export type SyncNode = SharedType | SyncElement;

export interface Cursor extends Range {
  data: {
    [key: string]: unknown;
  };
}
export interface CursorInfo extends Cursor{
  isForward: boolean;
  isCaret: boolean;
}

export interface CustomNode extends Node{
  [key: string]: any;
  children?: Descendant[];
}


export const SyncElement = {
  getText(element: SyncElement): Y.Text | undefined {
    return element?.get('text');
  },

  getChildren(element: SyncElement): Y.Array<SyncElement> | undefined {
    return element?.get('children');
  }
};

export const SyncNode = {
  getChildren(node: SyncNode): Y.Array<SyncElement> | undefined {
    if (node instanceof Y.Array) {
      return node;
    }

    return SyncElement.getChildren(node);
  },

  getText(node: SyncNode): Y.Text | undefined {
    if (node instanceof Y.Array) {
      return undefined;
    }

    return SyncElement.getText(node);
  },

  getFirstText(node: SyncNode): Y.Text {
    let text = SyncElement.getText(node as SyncElement);
    if (text) {
      return text;
    }
    const children = SyncNode.getChildren(node);
    const firstChild = children?.get(0);
    return SyncNode.getFirstText(firstChild as SyncNode);
  }
};
