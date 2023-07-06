import { ThemeOperation } from '../apply-to-yjs/theme/set-theme';
import { YjsEditor } from '../plugin';

export const applyTheme = (editor: YjsEditor, operation: ThemeOperation) => {
  if (operation.newProperties && operation.newProperties.themeColorMode) {
    editor.theme = operation.newProperties;
  }
};
