import React, { FC } from "react";

import styles from './Button.module.scss';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button className={styles.Root} onClick={onClick}>
    {children}
  </button>
);