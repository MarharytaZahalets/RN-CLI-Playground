import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';
import { Radius, glassSurface } from '../../core/theme/layout';

const styles = StyleSheet.create({
  actionButtonText: { color: Colors.textLight, fontSize: 17 },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 28,
  },
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
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'flex-start',
  },
  dateIcon: {
    alignItems: 'center',
    backgroundColor: Colors.glassMuted,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  clearDateButton: {
    marginLeft: 8,
    padding: 4,
  },
  deleteButton: {
    backgroundColor: Colors.labelCancel,
    borderRadius: Radius.md,
    flex: 1,
    minHeight: 52,
  },
  descriptionEditorHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  descriptionEditorRoot: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  descriptionEditorSafe: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  descriptionEditorHeaderSide: {
    minWidth: 72,
  },
  descriptionEditorHeaderTrailing: {
    alignItems: 'flex-end',
    minWidth: 72,
  },
  descriptionEditorInput: {
    color: Colors.text,
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 20,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  descriptionEditorTitle: {
    color: Colors.text,
    flex: 1,
    fontSize: 17,
    textAlign: 'center',
  },
  descriptionField: {
    ...glassSurface,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  descriptionInput: {
    color: Colors.text,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingRight: 44,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  dueDatePressable: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  expandButton: {
    alignItems: 'center',
    backgroundColor: Colors.glassMuted,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 8,
    width: 32,
  },
  flex: {
    flex: 1,
  },
  formContent: {
    flexGrow: 1,
  },
  pickerDone: {
    color: Colors.primary,
    fontSize: 16,
  },
  placeholder: {
    color: Colors.neutral,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    flex: 1,
    minHeight: 52,
  },
  selector: {
    ...glassSurface,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: Radius.md,
    flexDirection: 'row',
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%',
  },
  selectorLabel: {
    color: Colors.text,
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  statusButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  statusButtonContent: {
    alignItems: 'stretch',
    width: '100%',
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default styles;
