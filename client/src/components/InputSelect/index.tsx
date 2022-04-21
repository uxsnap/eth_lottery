import React from 'react';

import { Input, InputProps } from '../Input';
import { Select, SelectProps } from '../Select';

import styles from './InputSelect.module.scss';

interface InputSelectProps extends InputProps, SelectProps { }

export const InputSelect = ({ label, mask, options, onChange, onChangeSelect, selected, value }: InputSelectProps) => {
  return (
    <div className={styles.Root}>
      <Input onChange={onChange} value={value} label={label} mask={mask} />

      <div className={styles.Select}>
        <Select selected={selected} onChangeSelect={onChangeSelect} options={options} />
      </div>
    </div>
  );
};  