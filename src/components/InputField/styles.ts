import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';
import { Radius, glassSurface } from '../../core/theme/layout';

const styles = StyleSheet.create({
  input: {
    ...glassSurface,
    borderRadius: Radius.md,
    color: Colors.text,
    fontSize: 16,
    marginBottom: 4,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default styles;
