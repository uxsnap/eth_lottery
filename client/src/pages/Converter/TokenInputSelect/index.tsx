import React, { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react';

import { InputSelect } from '../../../components/InputSelect';
import { capitalize, handleNumbers } from '../../../utils';
import { Button, Icon } from '../../../components';
import { NuxTokenContractStoreContext, Web3Context } from '../../../mobxStore';
import { SelectOption } from '../../../types';

import styles from './TokenInputSelect.module.scss';

const currencyOptions: SelectOption[] = [
  { label: 'ETH', value: 'eth', icon: <Icon iconType='ethereum-brands' /> },
  { label: 'NXT', value: 'nxt', icon: <Icon iconType='cake' /> }
];

interface TokenInputSelect {
  selectType: 'buy' | 'sell',
  handleTokens?: () => void;
}

export const TokenInputSelect: FC<TokenInputSelect> = observer(({ selectType, handleTokens }) => {
  const nuxTokenStore = useContext(NuxTokenContractStoreContext);
  const web3Store = useContext(Web3Context);

  const [option, setOption] = useState<SelectOption>(currencyOptions[0]);

  const tokens: string = nuxTokenStore[`${selectType}Tokens`];
  const setTokens = nuxTokenStore[`set${capitalize(selectType)}Tokens` as 'setSellTokens' | 'setBuyTokens'];

  const { web3, accounts } = web3Store;
  const { nuxTokenContract } = nuxTokenStore;


  const handleClick = async () => {
    let amount = await web3.utils.toWei(tokens, 'ether');

    await nuxTokenContract.methods.buyToken(tokens).send({
      from: accounts[0],
      value: amount
    });

    handleTokens && handleTokens();
  };

  const capitalizedSelectType = capitalize(selectType);

  return (
    <div className={styles.Root}>
      <InputSelect
        label={capitalizedSelectType + ": "}
        mask={handleNumbers}
        value={tokens}
        onChange={(e: any) => setTokens(e.target.value)}
        selected={option}
        onChangeSelect={(value: SelectOption) => setOption(value)}
        options={currencyOptions}
      />

      <Button onClick={handleClick}>{capitalizedSelectType}</Button>
    </div>
  );
});