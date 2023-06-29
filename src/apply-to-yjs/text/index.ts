import { TextOperation } from 'slate';
import { OpMapper } from '../types';
import insertText from './insert-text';
import removeText from './remove-text';
import { SharedDoc } from '../../model';

const mappers: OpMapper<TextOperation, SharedDoc> = {
  insert_text: insertText,
  remove_text: removeText
};

export default mappers;
