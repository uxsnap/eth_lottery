import Web3 from 'web3';
import { makeAutoObservable } from 'mobx';
import { Contract } from 'ethers';
import { createContext } from 'react';

export interface IErc20Store {
  erc20: Contract;
  buyTokens: string;
  sellTokens: string;

  setErc20: (data: any) => void;
  setBuyTokens: (value: string) => void;
  setSellTokens: (value: string) => void;
}

export class Erc20Store implements IErc20Store {
  erc20: Contract;
  buyTokens = '';
  sellTokens = '';

  constructor() {
    makeAutoObservable(this);
  }

  setErc20 = (data: any) => {
    this.erc20 = data;
  };

  setBuyTokens = (value: string) => {
    this.buyTokens = value;
  }

  setSellTokens = (value: string) => {
    this.sellTokens = value;
  }
}

export const Erc20Context = createContext<Erc20Store>(new Erc20Store());