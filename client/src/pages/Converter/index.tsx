import React, { useState } from 'react';

import { Button } from '../../components';
import { InputSelect } from '../../components/InputSelect';
import { handleNumbers } from '../../utils';

import styles from './Converter.module.scss';

const currencyOptions = [
  { label: 'ETH', value: 'eth' },
  { label: 'USD', value: 'usd' },
  { label: 'CUR', value: 'cur' }
];

export const Converter = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');


  return (
    <form className={styles.Root} action="POST">
      <InputSelect mask={handleNumbers} value={from} onChange={(e: any) => setFrom(e.target.value)} label="From" options={currencyOptions} />
      <InputSelect mask={handleNumbers} value={to} onChange={(e: any) => setTo(e.target.value)} label="To" options={currencyOptions} />

      <Button>Submit</Button>
    </form>
  );
}