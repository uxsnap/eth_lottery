import React, { ReactElement, ReactNode } from 'react';

import { Input } from '../Input';
import { Select } from '../Select';

import styles from './InputSelect.module.scss';

interface InputSelectProps extends Record<any, any> {
  label: string;
  options: { label: string; value: string; icon: ReactNode; }[];
  mask?: (value: string) => any;
}

export const InputSelect = ({ label, mask, options, onChange, onSelect, selectValue, value }: InputSelectProps) => {
  return (
    <div className={styles.Root}>
      <Input onChange={onChange} value={value} label={label} mask={mask} />

      <div className={styles.Select}>
        <Select value={selectValue} onChange={onSelect} options={options} />
      </div>
    </div>
  );
};  