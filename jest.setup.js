import { jest } from '@jest/globals';

jest.mock('react-native-actions-sheet', () => {
  return {
    default: () => null,
    SheetProvider: ({ children }) => children,
    show: jest.fn(),
    hide: jest.fn(),
    registerSheet: jest.fn(),
  };
});

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const { View } = require('react-native');

  const DateTimePicker = (props) => React.createElement(View, props);
  DateTimePicker.displayName = 'DateTimePicker';

  return {
    __esModule: true,
    default: DateTimePicker,
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn(() => ({
      Navigator: jest.fn(() => null), // Mock Navigator component
      Screen: jest.fn(() => null), // Mock Screen component
    })),
  };
});
