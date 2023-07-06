import { Node, Text } from 'slate';
import * as Y from 'yjs';
import { SharedDoc, toSlateDoc } from '../src';
import { toSharedContent } from '../src/utils';
import { TransformFunc } from './test-editor';

export interface Test {
  name: string;
  transform: TransformFunc;
}

export const initialState: Node[] = [
  createNode('paragraph', 'alfa bravo'),
  createNode('paragraph', 'charlie delta'),
  createNode('paragraph', 'echo foxtrot'),
  createNode('paragraph', 'golf hotel')
];

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


