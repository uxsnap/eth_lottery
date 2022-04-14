import { ethers } from "ethers";
import { observer } from "mobx-react"
import React, { useEffect, useState } from 'react';

import { Button } from '../../components';
import { InputSelect } from '../../components/InputSelect';
import { web3Store } from "../../mobxStore";
import { handleNumbers } from '../../utils';

import styles from './Converter.module.scss';

const currencyOptions = [
  { label: 'ETH', value: 'eth' },
  { label: 'USD', value: 'usd' },
  { label: 'CUR', value: 'cur' }
];

export const Converter = observer(() => {
  const [buy, setBuy] = useState('');
  const [sell, setSell] = useState('');
  const [buyCur, setBuyCur] = useState('');
  const [sellCur, setSellCur] = useState('');
  const [curAmount, setCurAmount] = useState('');

  const { erc20, signer } = web3Store;

  const getBalance = async () => {
    const address = await signer.getAddress();
    // @ts-ignore
    const amount = await erc20.balanceOf(address);
    setCurAmount(amount.toString());
  };

  useEffect(() => {
    getBalance();
  });

  const handleClick = async () => {
    let amount = await ethers.utils.parseEther(buy.toString());

    console.log(buy, amount);

    // @ts-ignore
    await erc20.buyToken(buy, { value: amount });
    getBalance();
  };

  return (
    <div className={styles.Root}>
      {curAmount}
      <div>
        <InputSelect
          label="Buy: "
          mask={handleNumbers}
          selectValue={buyCur}
          onSelect={setBuyCur}
          value={buy}
          onChange={(e: any) => setBuy(e.target.value)}
          options={currencyOptions}
        />

        <Button onClick={handleClick}>Buy</Button>
      </div>

      <div>
        <InputSelect
          label="Sell: "
          mask={handleNumbers}
          value={sell}
          selectValue={sellCur}
          onSelect={setSell}
          onChange={(e: any) => setSellCur(e.target.value)}
          options={currencyOptions}
        />

        <Button>Sell</Button>
      </div>
    </div>
  );
});