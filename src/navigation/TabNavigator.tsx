import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Path } from './constants';
import {
  geolocationScreenOptions,
  tabNavigatorOptions,
  taskListScreenOptions,
} from './screenOptions';
import TabBar from './TabBar';
import { GeolocationScreen, SettingsScreen, TaskListScreen } from '../screens';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

// React Navigation calls `tabBar` as a render function, not as a component.
// Returning an element here keeps TabBar's hooks in a real component render.
const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={Path.TaskList}
      screenOptions={tabNavigatorOptions}
      tabBar={renderTabBar}
    >
      <Tab.Screen
        name={Path.TaskList}
        component={TaskListScreen}
        options={taskListScreenOptions}
      />
      <Tab.Screen
        name={Path.Geolocation}
        component={GeolocationScreen}
        options={geolocationScreenOptions}
      />
      <Tab.Screen name={Path.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
