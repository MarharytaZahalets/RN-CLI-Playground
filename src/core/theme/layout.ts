import { Platform, StyleSheet } from 'react-native';

import { Colors } from './colors';

export const Radius = {
  md: 16, // medium
  lg: 22, // large
  xl: 28, // extra large
  full: 999, // full rounded
} as const;

export const glassShadow = Platform.select({
  ios: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
  },
  android: {
    elevation: 3,
  },
  default: {},
});

export const glassSurface = {
  backgroundColor: Colors.glass,
  borderColor: Colors.glassBorder,
  borderWidth: StyleSheet.hairlineWidth,
};
