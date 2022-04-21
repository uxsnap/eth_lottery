import { ReactNode } from "react";

export type ContractNetworkId = '5777';

interface ContractNetworkData {
  events: any;
  links: any;
  address: string;
  transactionHash: string;
}

export interface ContractNetwork {
  networks: Record<ContractNetworkId, ContractNetworkData>;
}

export interface SelectOption { label: string; value: string; icon: ReactNode; }