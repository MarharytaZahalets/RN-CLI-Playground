import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';
import { Radius } from '../../core/theme/layout';

const styles = StyleSheet.create({
  doneButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    marginTop: 8,
    minHeight: 52,
  },
  doneLabel: {
    color: Colors.textLight,
    fontSize: 17,
  },
});

export default styles;
