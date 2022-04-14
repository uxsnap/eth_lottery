import Web3 from 'web3';
import { makeAutoObservable } from 'mobx';
import { ethers } from 'ethers';

export interface IWeb3Store {
  web3?: Web3;
  accounts: string[];
  networkId: string;
  signer: ethers.providers.JsonRpcSigner;
  erc20: any;
}

export class Web3Store implements IWeb3Store {
  web3: Web3;
  accounts = [] as string[];
  networkId = '';
  signer: ethers.providers.JsonRpcSigner;
  erc20 = null;

  constructor() {
    makeAutoObservable(this)
  }

  setWeb3 = (data: Web3) => {
    this.web3 = data as Web3;
  }

  setAccounts = (data: string[]) => {
    this.accounts = data;
  }

  setNetworkId = (data: string) => {
    this.networkId = data;
  }

  setSigner = (signer: ethers.providers.JsonRpcSigner) => {
    this.signer = signer;
  };

  setErc20 = (data: any) => {
    this.erc20 = data;
  };
}

export const web3Store = new Web3Store();