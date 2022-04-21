import { observer } from "mobx-react"
import { AbiItem } from 'web3-utils'
import React, { useContext, useEffect, useState } from 'react';

import { NuxTokenContractStoreContext, Web3Context } from "../../mobxStore";
import NuxTokenContract from "../../contracts/NuxToken.json"
import { TokenInputSelect } from "./TokenInputSelect";
import { Icon } from "../../components";
import { ContractNetwork, ContractNetworkId } from "../../types";

import styles from './Converter.module.scss';

export const Converter = observer(() => {
  const [curNuxAmount, setCurNuxAmount] = useState('');
  const [curEthAmount, setCurEthAmount] = useState('');

  const { nuxTokenContract: curNuxTokenContract, setNuxTokenContract } = useContext(NuxTokenContractStoreContext);
  const { web3, networkId, accounts } = useContext(Web3Context);

  useEffect(() => {
    if (!networkId) return;

    const deployedNetwork: { address: string } = (NuxTokenContract as ContractNetwork).networks[networkId as ContractNetworkId];

    const nuxTokenContract = new web3.eth.Contract(
      NuxTokenContract.abi as AbiItem[],
      deployedNetwork.address
    );

    setNuxTokenContract(nuxTokenContract);

  }, [web3, networkId]);

  useEffect(() => {
    if (!curNuxTokenContract) return;

    getNuxBalance();
    getEthBalakce();
  }, [curNuxTokenContract]);

  const getNuxBalance = async () => {
    const address = accounts[0];

    const amount = await curNuxTokenContract.methods.balanceOf(address).call();
    setCurNuxAmount(amount.toString());
  };

  const getEthBalakce = async () => {
    const address = accounts[0];

    const amount = await web3.eth.getBalance(address);
    setCurEthAmount(parseInt(web3.utils.fromWei(amount, 'ether')) + '');
  };

  const handleBuy = async (tokens: string) => {
    let amount = await web3.utils.toWei(tokens + '', 'ether');

    await curNuxTokenContract.methods.buyToken(tokens).send({
      from: accounts[0],
      value: amount
    });

    getEthBalakce();
    getNuxBalance();
  };

  const handleSell = async (tokens: string) => {
    await curNuxTokenContract.methods.sellToken(tokens).send({
      from: accounts[0],
    });

    getEthBalakce();
    getNuxBalance();
  };


  return (
    <div className={styles.Root}>
      <div className={styles.Balances}>
        <div className={styles.Balance}>
          <div>Current NXT amount:</div>

          <div>
            <Icon iconType='cake' />
            <span>{curNuxAmount || 0}</span>
          </div>
        </div>

        <div className={styles.Balance}>
          <div>Current ETH amount:</div>

          <div>
            <Icon iconType='ethereum-brands' />
            <span>{curEthAmount || 0}</span>
          </div>
        </div>
      </div>

      <div>
        <TokenInputSelect selectType="buy" handleTokens={handleBuy} />
      </div>

      <div>
        <TokenInputSelect selectType="sell" handleTokens={handleSell} />
      </div>
    </div>
  );
});