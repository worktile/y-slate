import { Descendant, Path, Range } from 'slate';
import * as Y from 'yjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SyncElement = Y.Map<any>;
export type SharedType = Y.XmlText;
// export type SharedType = Y.XmlText;
export type SyncNode = Y.Array<SyncElement> | SyncElement;

export interface Cursor extends Range {
  data: {
    [key: string]: unknown;
  };
}
export interface CursorInfo extends Cursor {
  isForward: boolean;
  originAnchorPath: Path;
  originFocusPath: Path;
}

export interface CustomNode extends Node {
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

export type ThemeType = { theme?: string | null };
export type DeltaAttributes = {
  retain: number;
  attributes: Record<string, unknown>;
};
export type DeltaRetain = { retain: number };
export type DeltaDelete = { delete: number };
export type DeltaInsert = {
  insert: string | Y.XmlText | ThemeType;
  attributes?: Record<string, unknown>;
};
export type DeltaSet = {
  set: string | Y.XmlText;
};

export type InsertDelta = Array<DeltaInsert>;
export type SetDelta = Array<DeltaSet>;
export type Delta = Array<DeltaRetain | DeltaDelete | DeltaInsert | DeltaAttributes | DeltaSet>;
