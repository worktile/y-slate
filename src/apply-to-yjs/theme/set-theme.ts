import { SharedTheme, ThemeType } from '../../model';
import { toSyncTheme } from '../../utils';

export type ThemeOperation = {
  type: 'set_theme';
  properties: Partial<ThemeType>;
  newProperties: Partial<ThemeType>;
};

export default function setTheme(theme: SharedTheme, op: ThemeOperation): SharedTheme {
  if(op.newProperties && op.newProperties.themeColorMode) {
    theme.set('theme', toSyncTheme(op.newProperties as ThemeType));
  }
  return theme;
}
