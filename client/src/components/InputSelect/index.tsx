import React, { ReactElement, ReactNode } from 'react';

import { Input } from '../Input';
import { Select } from '../Select';

import styles from './InputSelect.module.scss';

interface InputSelectProps {
  label: string;
  options: any[];
  mask?: (value: string) => any;
}

export const InputSelect = ({ label, mask, options, onChange, value }: any) => {
  return (
    <div className={styles.Root}>
      <Input onChange={onChange} value={value} label={label} mask={mask} />

      <Select onChange={() => false} options={options} />
    </div>
  );
};  