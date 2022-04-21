import React, { FC } from 'react';

export interface IconProps {
  iconType: string;
  onClick?: () => void;
}

export const Icon: FC<IconProps> = ({ iconType, onClick }) => (
  <span
    onClick={onClick ? onClick : undefined}
    className={`icon icon-${iconType}`} />
);

export default Icon;