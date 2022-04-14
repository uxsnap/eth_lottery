import React, { ReactElement, ReactNode } from 'react';

import { Input } from '../Input';
import { Select } from '../Select';

import styles from './InputSelect.module.scss';

interface InputSelectProps {
  label: string;
  options: any[];
  mask?: (value: string) => any;
}

export const InputSelect = ({ label, mask, options, onChange, onSelect, selectValue, value }: any) => {
  return (
    <div className={styles.Root}>
      <Input onChange={onChange} value={value} label={label} mask={mask} />

      <Select value={selectValue.label} onChange={onSelect} options={options} />
    </div>
  );
};  