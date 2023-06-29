import { Operation } from 'slate';
import { ThemeOperation } from './theme/set-theme';
import { YjsEditor } from '../plugin';

export type MergeOperation = Operation | ThemeOperation;

export type ApplyFunc<O extends MergeOperation = MergeOperation, T = any > = (
  sharedContent: T,
  op: O,
  editor?: YjsEditor
) => T;

export type OpMapper<O extends MergeOperation = MergeOperation, T = any> = {
  [K in O['type']]: O extends { type: K } ? ApplyFunc<O, T> : never;
};

