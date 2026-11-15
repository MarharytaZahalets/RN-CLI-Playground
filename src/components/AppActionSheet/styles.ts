import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';
import { Radius } from '../../core/theme/layout';

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderRadius: 10,
    height: 32,
    justifyContent: 'center',
    marginRight: 12,
    width: 32,
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
  chip: {
    alignItems: 'center',
    backgroundColor: Colors.input,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  chipDisabled: {
    opacity: 0.4,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 12,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.text,
  },
  chipTextSelected: {
    color: Colors.textLight,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: Colors.glassMuted,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  container: {
    paddingBottom: 8,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  header: {
    color: Colors.text,
    flex: 1,
    fontSize: 22,
    letterSpacing: -0.3,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  indicator: {
    backgroundColor: Colors.neutral,
    borderRadius: 2,
    height: 5,
    width: 36,
  },
  list: {
    gap: 10,
  },
  radio: {
    alignItems: 'center',
    borderColor: Colors.neutral,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    height: 22,
    justifyContent: 'center',
    marginLeft: 12,
    width: 22,
  },
  radioDot: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    height: 10,
    width: 10,
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  row: {
    alignItems: 'center',
    backgroundColor: Colors.elevated,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 56,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  rowSelected: {
    backgroundColor: Colors.rowSelected,
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  rowSubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  rowText: {
    color: Colors.text,
    fontSize: 16,
  },
  rowTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  rowTextDestructive: {
    color: Colors.labelCancel,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 14,
    marginBottom: 8,
    marginTop: 4,
  },
  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
  },
});

export default styles;
