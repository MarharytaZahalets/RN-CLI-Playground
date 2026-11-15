import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, Pressable, View } from 'react-native';

import { TAB_ICON_SIZE } from '../core/constants/icons';
import { Colors } from '../core/theme/colors';
import { Path } from './constants';
import styles from './styles';
import { GeolocationIcon, SettingsIcon, TaskListIcon } from '../assets/icons/svg';
import { BaseText } from '../components';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TAB_LABELS: Record<string, string> = {
  [Path.TaskList]: 'Tasks',
  [Path.Geolocation]: 'Map',
  [Path.Settings]: 'Settings',
};

const TabBar = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps): React.ReactElement | null => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const show = Keyboard.addListener(showEvent, () => setHidden(true));
    const hide = Keyboard.addListener(hideEvent, () => setHidden(false));

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <View style={[styles.tabBarWrap, { bottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const color = isFocused ? Colors.primary : Colors.neutral;
          const label = TAB_LABELS[route.name] ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let icon: React.ReactNode = null;
          switch (route.name) {
            case Path.TaskList:
              icon = (
                <TaskListIcon
                  width={TAB_ICON_SIZE}
                  height={TAB_ICON_SIZE}
                  color={color}
                />
              );
              break;
            case Path.Geolocation:
              icon = (
                <GeolocationIcon
                  width={TAB_ICON_SIZE}
                  height={TAB_ICON_SIZE}
                  color={color}
                />
              );
              break;
            case Path.Settings:
              icon = (
                <SettingsIcon
                  width={TAB_ICON_SIZE}
                  height={TAB_ICON_SIZE}
                  color={color}
                />
              );
              break;
            default:
              icon = null;
          }

          return (
            <Pressable
              key={route.key}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [styles.tabItem, { opacity: pressed ? 0.7 : 1 }]}
            >
              {icon}
              <BaseText isBold={isFocused} style={[styles.tabLabel, { color }]}>
                {label}
              </BaseText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
