import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../../core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const PlusIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path
        d='M12 5c.6 0 1 .4 1 1v5h5c.6 0 1 .4 1 1s-.4 1-1 1h-5v5c0 .6-.4 1-1 1s-1-.4-1-1v-5H6c-.6 0-1-.4-1-1s.4-1 1-1h5V6c0-.6.4-1 1-1z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default PlusIcon;
