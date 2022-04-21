import React, { ReactNode, useRef, useState } from 'react';

import { Icon, Input } from '..';
import { SelectOption } from '../../types';
import { useOutsideClick } from '../../utils/hooks';

import styles from './Select.module.scss';

export interface SelectProps {
  options: SelectOption[];
  onChangeSelect: (value: SelectOption) => void;
  selected: SelectOption;
}

export const Select = ({ options = [], onChangeSelect, selected }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleChange = (option: any) => {
    onChangeSelect && onChangeSelect(option);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className={styles.Root}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.Input}>
        <Input prefix={selected.icon} value={selected.label} readOnly />

        <div className={styles.Arrow}>
          <Icon iconType='angle-down' />
        </div>
      </div>

      {isOpen && (
        <ul ref={dropdownRef} className={styles.Dropdown}>
          {options.map((option) => (
            <li onClick={() => handleChange(option)} key={option.value}>
              <div className={styles.Icon}>{option.icon}</div>
              <div className={styles.Label}>{option.label}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};