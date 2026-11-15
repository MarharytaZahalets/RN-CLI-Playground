import { Platform, StyleSheet } from 'react-native';

import { Colors } from '../core/theme/colors';
import { Radius } from '../core/theme/layout';

const styles = StyleSheet.create({
  header: { color: Colors.text, fontSize: 20 },
  tabBar: {
    alignItems: 'center',
    backgroundColor: Colors.tabBar,
    borderColor: Colors.tabBarBorder,
    borderRadius: Radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 64,
    paddingHorizontal: 8,
    paddingVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  tabBarWrap: {
    left: 20,
    position: 'absolute',
    right: 20,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
});

export default styles;
