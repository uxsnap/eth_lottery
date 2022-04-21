import React, { FC, ReactNode } from "react";

import styles from './Header.module.scss';

interface HeaderProps {
  children: ReactNode;
  onClick: () => void;
}

export const Header: FC<HeaderProps> = ({ children, onClick }) => (
  <h1 className={styles.Root} onClick={onClick}>{children}</h1>
);