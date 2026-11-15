import { Path } from './constants';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Task } from '../models/TaskList';

// *** Navigator Params ***
export type RootStackParamList = {
  [Path.Home]: undefined;
  [Path.SignIn]: undefined;
  [Path.SignUp]: undefined;
  [Path.Tabs]: NavigatorScreenParams<TabParamList>;
  [Path.DetailView]: Task;
};

export type TabParamList = {
  [Path.TaskList]: undefined;
  [Path.Settings]: undefined;
  [Path.Geolocation]: undefined;
};

// *** Screen Props ***
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof Path.Home
>;

export type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof Path.SignIn
>;

export type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof Path.SignUp
>;

export type DetailViewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof Path.DetailView
>;

// props with access both Root and Tab navigators
export type TaskListScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, typeof Path.TaskList>,
  NativeStackScreenProps<RootStackParamList>
>;

export type GeolocationScreenProps = NativeStackScreenProps<
  TabParamList,
  typeof Path.Geolocation
>;

export type SettingsProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, typeof Path.Settings>,
  NativeStackScreenProps<RootStackParamList>
>;

// *** Tab Specific Props ***
export type TabBarIconProps = {
  focused?: boolean;
  color?: string;
  size?: number;
};
