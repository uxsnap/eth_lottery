import React from 'react';

import styles from './Input.module.scss';

export const Input = ({
  mask,
  label = '',
  value = '',
  onChange = (event: any) => '',
  name = '',
  type = 'text',
  error = '',
  ...inputProps
}: any) => (
  <label className={styles.Root} htmlFor={name}>
    <div className={styles.Label}>{label}</div>

    <div className={styles.Input}>
      <input value={mask ? mask(value) : value} onChange={onChange} type={type} {...inputProps} />
    </div>

    {error && <div className={styles.Error}>{error}</div>}
  </label>
);