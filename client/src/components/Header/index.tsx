import React, { ReactNode } from "react";

import styles from './Header.module.scss';

interface HeaderProps {
  children: ReactNode;
  onClick: () => void;
}

export const Header = ({ children, onClick }: HeaderProps) => (
  <h1 className={styles.Root} onClick={onClick}>{children}</h1>
);