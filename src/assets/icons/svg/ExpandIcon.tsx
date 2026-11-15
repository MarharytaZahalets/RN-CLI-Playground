import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../../core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const ExpandIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path
        d='M8 4H5.5C4.67 4 4 4.67 4 5.5V8h1.75V5.75H8V4zm10.5 0H16v1.75h2.25V8H20V5.5C20 4.67 19.33 4 18.5 4zM4 18.5c0 .83.67 1.5 1.5 1.5H8v-1.75H5.75V16H4v2.5zM18.25 18.25H16V20h2.5c.83 0 1.5-.67 1.5-1.5V16h-1.75v2.25z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default ExpandIcon;
