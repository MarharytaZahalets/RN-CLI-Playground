import { registerSheet, type SheetDefinition } from 'react-native-actions-sheet';

import AppActionSheet, {
  type renderItemProps,
  type SheetSection,
} from './src/components/AppActionSheet/AppActionSheet';
import DueDatePickerSheet from './src/components/DueDatePickerSheet/DueDatePickerSheet';

registerSheet('app-action-sheet', AppActionSheet);
registerSheet('due-date-picker', DueDatePickerSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'app-action-sheet': SheetDefinition<{
      payload: {
        title: string;
        items?: renderItemProps[];
        sections?: SheetSection[];
      };
    }>;
    'due-date-picker': SheetDefinition<{
      payload: {
        date?: string | null;
        onConfirm: (date: Date) => void;
      };
    }>;
  }
}

export {};
