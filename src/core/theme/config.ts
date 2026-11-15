import { DarkTheme } from '@react-navigation/native';

import { Colors } from './colors';

export const Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.background,
    card: Colors.secondary,
    border: Colors.divider,
    primary: Colors.primary,
    secondary: Colors.secondary,
    accent: Colors.accent,
    text: Colors.text,
    notification: Colors.primary,
    labelDone: Colors.labelDone,
    labelCancel: Colors.labelCancel,
    labelInProgress: Colors.labelInProgress,
    labelOngoing: Colors.labelOngoing,
  },
};

export const inheritTextColor = {
  color: Colors.text,
};
