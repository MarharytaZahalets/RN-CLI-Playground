import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import { AppSaveAreaView } from '../../components';
import SettingActionButton from '../../components/SettingActionButton/SettingActionButton';
import { Path } from '../../navigation/constants';
import { openAppSettings } from '../../core/utils/utils';

import type { SettingsProps } from '../../navigation/types';

const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {
  const goToHomeScreen = () => {
    navigation.pop(1);
  };

  return (
    <AppSaveAreaView style={styles.container}>
      <View>
        <SettingActionButton title={'Open Settings'} onPress={openAppSettings} />
        <SettingActionButton title={'Go to Welcome page'} onPress={goToHomeScreen} />
        <SettingActionButton
          title={'Open Sign In'}
          onPress={() => navigation.navigate(Path.SignIn)}
        />
        <SettingActionButton
          title={'Open Sign Up'}
          onPress={() => navigation.navigate(Path.SignUp)}
        />
      </View>
    </AppSaveAreaView>
  );
};

export default SettingsScreen;
