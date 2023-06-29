import { SharedTheme } from '../../model';
import { OpMapper } from '../types';
import setTheme, { ThemeOperation } from './set-theme';

const mappers: OpMapper<ThemeOperation, SharedTheme> = {
  set_theme: setTheme
};


export default mappers;