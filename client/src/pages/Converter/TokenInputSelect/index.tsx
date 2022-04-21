import React, { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react';

import { capitalize, handleNumbers } from '../../../utils';
import { Button, Input } from '../../../components';
import { NuxTokenContractStoreContext } from '../../../mobxStore';

import styles from './TokenInputSelect.module.scss';


interface TokenInputSelect {
  selectType: 'buy' | 'sell',
  handleTokens: (amount: string) => void;
}

export const TokenInputSelect: FC<TokenInputSelect> = observer(({ selectType, handleTokens }) => {
  const nuxTokenStore = useContext(NuxTokenContractStoreContext);

  const tokens: string = nuxTokenStore[`${selectType}Tokens`];
  const setTokens = nuxTokenStore[`set${capitalize(selectType)}Tokens` as 'setSellTokens' | 'setBuyTokens'];

  const capitalizedSelectType = capitalize(selectType);

  return (
    <div className={styles.Root}>
      <Input
        onChange={(value: string) => setTokens(value)}
        value={tokens}
        label={capitalizedSelectType + ": "}
        mask={handleNumbers}
      />

      <Button onClick={() => handleTokens(tokens)}>{capitalizedSelectType}</Button>
    </div>
  );
});