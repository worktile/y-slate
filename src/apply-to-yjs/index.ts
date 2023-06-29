import { Operation } from 'slate';
import invariant from 'tiny-invariant';
import { SharedDoc, SharedTheme } from '../model';
import { YjsEditor } from '../plugin';
import node from './node';
import text from './text';
import theme from './theme';
import { ApplyFunc, MergeOperation, OpMapper } from './types';

const nullOp: ApplyFunc<Operation, SharedDoc> = (doc: SharedDoc) => doc;

const opMappers: OpMapper = {
  ...text,
  ...node,
  ...theme,

  // SetSelection is currently a null op since we don't support cursors
  set_selection: nullOp
};


/**
 * Applies slate operations to a SharedDoc
 *
 * @param SharedDoc
 * @param op
 */
export default function applySlateOp(
  sharedContent: SharedDoc | SharedTheme,
  operation: MergeOperation,
  editor: YjsEditor
): SharedDoc | SharedTheme {
  invariant(sharedContent.doc, 'Shared type without attached document');

  sharedContent.doc.transact(() => {
    const apply = opMappers[operation.type] as ApplyFunc<typeof operation, typeof sharedContent>;
    if (!apply) {
      throw new Error(`Unknown operation: ${operation.type}`);
    }
    return apply(sharedContent, operation);
  }, editor);

  return sharedContent;
}
