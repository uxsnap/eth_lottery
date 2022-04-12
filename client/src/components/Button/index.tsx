import React from "react";

import styles from './Button.module.scss';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => (
  <button className={styles.Root} onClick={onClick}>
    {children}
  </button>
);