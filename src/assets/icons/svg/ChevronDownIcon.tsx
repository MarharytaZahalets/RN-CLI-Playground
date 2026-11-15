import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../../core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const ChevronDownIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path
        d='M6.7 9.3c.4-.4 1-.4 1.4 0L12 13.2l3.9-3.9c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.6 4.6c-.4.4-1 .4-1.4 0L6.7 10.7c-.4-.4-.4-1 0-1.4z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default ChevronDownIcon;
