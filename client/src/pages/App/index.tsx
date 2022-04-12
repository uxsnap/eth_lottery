import React, { FC, useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

import { Header } from "../../components";
import LotteryContract from "../../contracts/Lottery.json";
import getWeb3 from "../../getWeb3";
import { Converter } from "../Converter";
import { Lottery } from "../Lottery";

import styles from './App.module.scss';

const App: FC = () => {
  const [web3, setWeb3] = useState<Web3>();
  const [accounts, setAccounts] = useState<string[]>();
  const [contract, setContract] = useState<Contract>();

  const [pageType, setPageType] = useState('converter');

  useEffect(() => {
    onMount();
  }, []);

  const onMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId() + '';

      const LotteryContractInstance: any = LotteryContract;

      const deployedNetwork = LotteryContractInstance.networks[networkId];

      const instance = new web3.eth.Contract(
        LotteryContractInstance.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  const renderPageByPageType = (pageType: string) => {
    switch (pageType) {
      case 'lottery':
        return <Lottery />
      case 'converter':
        return <Converter />
      default:
        return '';
    }
  };

  return (
    <div className={styles.Root}>
      <div className={styles.Header}>
        <Header onClick={() => setPageType('lottery')}>Lottery</Header>

        <Header onClick={() => setPageType('converter')}>Converter</Header>
      </div>

      {renderPageByPageType(pageType)}

    </div >
  );
}

export default App;
