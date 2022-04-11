import React, { FC, useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

import LotteryContract from "./contracts/Lottery.json";
import getWeb3 from "./getWeb3";

const App: FC = () => {
  const [web3, setWeb3] = useState<Web3>();
  const [accounts, setAccounts] = useState<string[]>();
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    onMount();
  }, []);

  const handleClick = async () => {
    const res = await contract?.methods.isOpen().call();
    console.log(res);
  };

  const handleChangeOpen = async () => {
    const res = await contract?.methods.setIsOpen(true).send({ from: accounts?.[0] });
    console.log(res);
  };

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

  return (
    <div className="App">
      <button onClick={handleClick}>Click</button>
      <button onClick={handleChangeOpen}>Change open</button>
    </div >
  );
}

export default App;
