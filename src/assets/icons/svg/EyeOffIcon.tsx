import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../../core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const EyeOffIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path
        d='M3.3 2.3c-.4.4-.4 1 0 1.4l2.1 2.1C3.4 7.2 1.8 9.4 1 12c1.7 3.9 6 7 11 7 2 0 3.9-.5 5.5-1.4l3.2 3.2c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-18-18c-.4-.4-1-.4-1.4 0zM12 17c-3.9 0-7.3-2.3-8.8-5.5.6-1.2 1.5-2.3 2.6-3.2l2.1 2.1A4.5 4.5 0 0 0 12 16.5c.5 0 1-.1 1.4-.2l1.5 1.5c-.9.4-1.9.7-2.9.7zm9.8-5c-.4 1-1 1.9-1.7 2.7l-1.5-1.5c.5-.7.8-1.4 1-2.2C18.3 8.3 15.4 6.5 12 6.5c-.5 0-1 0-1.5.1L8.9 5C9.9 4.7 10.9 4.5 12 4.5c5 0 9.3 3.1 11 7-.4 1-1 1.9-1.2.5z'
        fill={props?.color || Colors.neutral}
      />
    </Svg>
  );
};

export default EyeOffIcon;
