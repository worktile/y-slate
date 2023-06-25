import { Operation } from 'slate';
import { SharedType } from '../model';
import { YjsEditor } from '../plugin';

export type ApplyFunc<O extends Operation = Operation> = (
  sharedType: SharedType,
  op: O,
  editor: YjsEditor
) => SharedType;

export type OpMapper<O extends Operation = Operation> = {
  [K in O['type']]: O extends { type: K } ? ApplyFunc<O> : never;
};
