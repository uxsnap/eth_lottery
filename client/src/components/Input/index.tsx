import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './Input.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  mask?: (value: string) => string;
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
}) => (
  <label className={styles.Root} htmlFor={name}>
    <div className={styles.Label}>{label}</div>

    <div className={cn(styles.Input, prefix && styles.withPrefix)}>
      {prefix && <div className={styles.Prefix}>{prefix}</div>}

      <input value={mask ? mask(value) : value} onChange={onChange} type={type} {...inputProps} />
    </div>

    {error && <div className={styles.Error}>{error}</div>}
  </label>
);