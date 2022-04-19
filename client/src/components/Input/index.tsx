import React from 'react';
import cn from 'classnames';

import styles from './Input.module.scss';
import classNames from 'classnames';

export const Input = ({
  mask,
  label = '',
  value = '',
  onChange = (event: any) => '',
  name = '',
  type = 'text',
  error = '',
  prefix = '',
  ...inputProps
}: any) => (
  <label className={styles.Root} htmlFor={name}>
    <div className={styles.Label}>{label}</div>

    <div className={cn(styles.Input, prefix && styles.withPrefix)}>
      {prefix && <div className={styles.Prefix}>{prefix}</div>}
      <input value={mask ? mask(value) : value} onChange={onChange} type={type} {...inputProps} />
    </div>

    {error && <div className={styles.Error}>{error}</div>}
  </label>
);