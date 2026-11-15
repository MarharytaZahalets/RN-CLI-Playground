import { StyleSheet } from 'react-native';

import { Colors } from '../../core/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: 'flex-start',
    marginVertical: 0,
  },
  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 140,
    paddingTop: 4,
  },
  header: {
    fontSize: 34,
    letterSpacing: 0.3,
    marginTop: 4,
  },
  loader: { flex: 1 },
});

export default styles;
