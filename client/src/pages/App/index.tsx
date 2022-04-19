import { ethers } from "ethers";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";

import { Header } from "../../components";
import { Web3Context } from "../../mobxStore/Web3Store";
import getWeb3 from "../../utils/getWeb3";
import { Converter } from "../Converter";
import { Lottery } from "../Lottery";

import styles from './App.module.scss';

const App = observer(() => {
  const web3Store = useContext(Web3Context);
  const [pageType, setPageType] = useState('converter');

  useEffect(() => {
    onMount();

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });
  });


  const onMount = async () => {
    try {
      const data: { web3: Web3; provider: ethers.providers.Web3Provider } = await getWeb3();

      const { web3, provider } = data;

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId() + '';

      const signer = provider.getSigner();

      web3Store.setSigner(signer);
      web3Store.setWeb3(web3);
      web3Store.setAccounts(accounts);
      web3Store.setNetworkId(networkId);

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  if (!web3Store.web3) {
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
});

export default App;
