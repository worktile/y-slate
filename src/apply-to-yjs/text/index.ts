import { TextOperation } from 'slate';
import { OpMapper } from '../types';
import insertText from './insert-text';
import removeText from './remove-text';

const mappers: OpMapper<TextOperation> = {
  insert_text: insertText,
  remove_text: removeText
};

export default mappers;
