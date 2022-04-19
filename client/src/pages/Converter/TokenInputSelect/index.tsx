import React, { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react';

import { InputSelect } from '../../../components/InputSelect';
import { capitalize, handleNumbers } from '../../../utils';
import { Button, Icon } from '../../../components';
import { Erc20Context, Web3Context } from '../../../mobxStore';

import styles from './TokenInputSelect.module.scss';

const currencyOptions = [
  { label: 'ETH', value: 'eth', icon: <Icon iconType='ethereum-brands' /> },
  { label: 'CUR', value: 'cur', icon: <Icon iconType='dollar-sign-solid' /> }
];

interface TokenInputSelect {
  selectType: 'buy' | 'sell',
  handleTokens?: () => void;
}

export const TokenInputSelect: FC<TokenInputSelect> = observer(({ selectType, handleTokens }) => {
  const erc20Store = useContext(Erc20Context);
  const web3Store = useContext(Web3Context);

  const [option, setOption] = useState(currencyOptions[0]);

  const tokens: string = erc20Store[`${selectType}Tokens`];
  const setTokens = erc20Store[`set${capitalize(selectType)}Tokens` as 'setSellTokens' | 'setBuyTokens'];

  const { web3, accounts } = web3Store;
  const { erc20 } = erc20Store;


  const handleClick = async () => {
    let amount = await web3.utils.toWei(tokens, 'ether');

    // @ts-ignore 
    await erc20.methods.buyToken(tokens).send({
      from: accounts[0],
      value: amount
    });

    handleTokens && handleTokens();
  };

  return (
    <div className={styles.Root}>
      <InputSelect
        label="Buy: "
        mask={handleNumbers}
        value={tokens}
        onChange={(e: any) => setTokens(e.target.value)}
        selectValue={option}
        onSelect={setOption}
        options={currencyOptions}
      />

      <Button onClick={handleClick}>Buy</Button>
    </div>
  );
});