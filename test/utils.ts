import { createEditor, Node, Text } from 'slate';
import * as Y from 'yjs';
import { SharedDoc, SyncElement, toSlateDoc, withYjs } from '../src';
import { toSharedContent } from '../src/utils';
import { withTest } from './test-editor';

export function createText(text = ''): Text {
  return {
    text
  };
}

export function createNode(type = 'paragraph', text = '', data?: { [key: string]: any }) {
  return {
    type,
    children: [createText(text)],
    ...data
  };
}

export function createValue(children?: Node[]): { children: Node[] } {
  return {
    children: children || [createNode()]
  };
}

export function createDoc(children?: Node[]): Y.Doc {
  const doc = new Y.Doc();
  toSharedContent(doc.getArray('content'), createValue(children).children);
  return doc;
}

export function cloneDoc(doc: SharedDoc): Y.Doc {
  const clone = new Y.Doc();
  toSharedContent(clone.getArray('content'), toSlateDoc(doc));
  return clone;
}

export function wait(ms = 0): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function createTestEditor(value?: Node[]): any {
  const doc = new Y.Doc();
  const syncType = doc.getArray<SyncElement>('content');
  const syncTheme = doc.getMap('theme');

  if (value) {
    toSharedContent(syncType, value, syncTheme, {
      themeColorMode: 'default'
    });
  }

  return withTest(withYjs(createEditor(), syncType, syncTheme));
}
