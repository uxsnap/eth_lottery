import Web3 from 'web3';
import { makeAutoObservable } from 'mobx';
import { Contract } from 'ethers';
import { createContext } from 'react';

export interface NuxTokenContractStoreInterface {
  nuxTokenContract: Contract;
  buyTokens: string;
  sellTokens: string;

  setNuxTokenContract: (data: any) => void;
  setBuyTokens: (value: string) => void;
  setSellTokens: (value: string) => void;
}

export class NuxTokenContractStore implements NuxTokenContractStoreInterface {
  nuxTokenContract: Contract;
  buyTokens = '';
  sellTokens = '';

  constructor() {
    makeAutoObservable(this);
  }

  setNuxTokenContract = (data: any) => {
    this.nuxTokenContract = data;
  };

  setBuyTokens = (value: string) => {
    this.buyTokens = value;
  }

  setSellTokens = (value: string) => {
    this.sellTokens = value;
  }
}

export const NuxTokenContractStoreContext = createContext<NuxTokenContractStore>(new NuxTokenContractStore());