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
  const [curAmount, setCurAmount] = useState('');

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

    getBalance();
  }, [curNuxTokenContract]);

  const getBalance = async () => {
    const address = accounts[0];

    const amount = await curNuxTokenContract.methods.balanceOf(address).call();
    setCurAmount(amount.toString());
  };

  const handleClick = async () => {
    getBalance();
  };

  return (
    <div className={styles.Root}>
      <div className={styles.Balance}>
        <div>Current NXT token amount:</div>

        <div>
          <Icon iconType='cake' />
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