import { Colors } from '../core/theme/colors';
import { Path } from './constants';
import styles from './styles';

import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type {
  NativeStackNavigationOptions,
  NativeStackOptionsArgs,
} from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

// *** Options for Root Navigator Screens ***
export const homeScreenOptions: NativeStackNavigationOptions = { headerShown: false };

export const signInScreenOptions: NativeStackNavigationOptions = { headerShown: false };

export const signUpScreenOptions: NativeStackNavigationOptions = { headerShown: false };

export const tabsScreenOptions: NativeStackNavigationOptions = { headerShown: false };

export const detailViewScreenOptions = ({
  route,
}: NativeStackOptionsArgs<
  RootStackParamList,
  typeof Path.DetailView
>): NativeStackNavigationOptions => {
  return {
    title: route.params?.id ? 'Edit Task' : 'Create Task',
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: Colors.text,
    headerTitleStyle: styles.header,
    headerStyle: { backgroundColor: Colors.background },
    headerShadowVisible: false,
  };
};

// *** Options for Tab Navigator ***
export const tabNavigatorOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerBackButtonDisplayMode: 'minimal',
  animation: 'fade',
  headerTitleStyle: styles.header,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: Colors.background },
  sceneStyle: { backgroundColor: Colors.background },
};

export const taskListScreenOptions: BottomTabNavigationOptions = {
  title: 'Tasks',
  headerShown: false,
};

export const geolocationScreenOptions: BottomTabNavigationOptions = {
  title: 'My Location',
};
