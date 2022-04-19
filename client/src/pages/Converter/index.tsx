import { observer } from "mobx-react"
import { AbiItem } from 'web3-utils'
import React, { useContext, useEffect, useState } from 'react';

import { Erc20Context, Web3Context } from "../../mobxStore";
import NuxTokenContract from "../../contracts/NuxToken.json"
import { TokenInputSelect } from "./TokenInputSelect";

import styles from './Converter.module.scss';
import { Icon } from "../../components";

export const Converter = observer(() => {
  const [curAmount, setCurAmount] = useState('');

  const { erc20: curErc20, setErc20 } = useContext(Erc20Context);
  const { web3, networkId, accounts } = useContext(Web3Context);

  useEffect(() => {
    if (!networkId) return;

    // @ts-ignore
    const deployedNetwork: { address: string } = NuxTokenContract.networks[networkId];

    const erc20 = new web3.eth.Contract(
      NuxTokenContract.abi as AbiItem[],
      deployedNetwork.address
    );

    setErc20(erc20);

  }, [web3, networkId]);

  useEffect(() => {
    if (!curErc20) return;

    getBalance();
  }, [curErc20]);

  const getBalance = async () => {
    const address = accounts[0];

    const amount = await curErc20.methods.balanceOf(address).call();
    setCurAmount(amount.toString());
  };

  const handleClick = async () => {
    getBalance();
  };

  return (
    <div className={styles.Root}>
      <div className={styles.Balance}>
        <div>Current CUR token amount:</div>

        <div>
          <Icon iconType='dollar-sign-solid' />
          <span>{curAmount}</span>
        </div>
      </div>

      <div>
        <TokenInputSelect selectType="buy" handleTokens={handleClick} />
      </div>

      <div>
        <TokenInputSelect selectType="sell" />
      </div>
    </div>
  );
});