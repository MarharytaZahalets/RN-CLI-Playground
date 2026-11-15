import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';
import { Radius, glassSurface } from '../../core/theme/layout';

const TITLE_INSET = 38;

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  badgeCanceled: {
    backgroundColor: Colors.badgeCanceled,
  },
  badgeDone: {
    backgroundColor: Colors.badgeDone,
  },
  badgeInProcess: {
    backgroundColor: Colors.badgeInProcess,
  },
  badgeOngoing: {
    backgroundColor: Colors.badgeOngoing,
  },
  container: {
    ...glassSurface,
    borderRadius: Radius.md,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  date: {
    color: Colors.textMuted,
    fontSize: 12,
    marginLeft: 6,
  },
  dateRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: TITLE_INSET,
    marginTop: 8,
  },
  description: {
    color: Colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginLeft: TITLE_INSET,
    marginTop: 4,
  },
  pressed: {
    opacity: 0.86,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    flexShrink: 1,
    fontSize: 17,
    letterSpacing: -0.2,
    marginLeft: 8,
  },
});

export default styles;
