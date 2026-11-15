import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';
import { Radius, glassShadow, glassSurface } from '../../core/theme/layout';

const ICON_BUTTON_SIZE = 48;

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    height: ICON_BUTTON_SIZE,
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: ICON_BUTTON_SIZE,
  },
  chip: {
    ...glassSurface,
    borderRadius: Radius.full,
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipLabel: {
    color: Colors.text,
    fontSize: 14,
  },
  chipLabelSelected: {
    color: Colors.textLight,
    fontSize: 14,
  },
  chipRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 4,
  },
  chipDisabled: {
    opacity: 0.4,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconButtonWrap: {
    marginLeft: 10,
  },
  clearButton: {
    alignItems: 'center',
    height: ICON_BUTTON_SIZE,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    color: Colors.text,
    flex: 1,
    fontSize: 16,
    paddingRight: 8,
    paddingVertical: 0,
  },
  search: {
    ...glassSurface,
    ...glassShadow,
    alignItems: 'center',
    borderRadius: Radius.full,
    flex: 1,
    flexDirection: 'row',
    height: ICON_BUTTON_SIZE,
  },
  searchDisabled: {
    opacity: 0.4,
  },
  searchIconButton: {
    alignItems: 'center',
    height: ICON_BUTTON_SIZE,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  wrapper: {
    marginBottom: 8,
    marginTop: 12,
  },
});

export default styles;
