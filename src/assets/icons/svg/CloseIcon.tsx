import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../../core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const CloseIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path
        d='M6.7 6.7c.4-.4 1-.4 1.4 0L12 10.6l3.9-3.9c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L13.4 12l3.9 3.9c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0L12 13.4l-3.9 3.9c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4L10.6 12 6.7 8.1c-.4-.4-.4-1 0-1.4z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default CloseIcon;
