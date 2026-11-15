import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../../core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const EmailIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path
        d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z'
        fill={props?.color || Colors.neutral}
      />
    </Svg>
  );
};

export default EmailIcon;
