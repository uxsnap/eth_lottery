import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './Input.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'onChange'> {
  mask?: (value: string) => string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  type?: string;
  error?: string;
  prefix?: ReactNode;
}

export const Input: FC<InputProps> = ({
  mask,
  label = '',
  value = '',
  onChange,
  name = '',
  type = 'text',
  error = '',
  prefix = '',
  ...inputProps
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const curValue = mask ? mask(e.target.value) : e.target.value;

    onChange && onChange(curValue);
  };

  return (
    <label className={styles.Root} htmlFor={name}>
      <div className={styles.Label}>{label}</div>

      <div className={cn(styles.Input, prefix && styles.withPrefix)}>
        {prefix && <div className={styles.Prefix}>{prefix}</div>}

        <input value={mask ? mask(value) : value} onChange={handleChange} type={type} {...inputProps} />
      </div>

      {error && <div className={styles.Error}>{error}</div>}
    </label>
  );
};