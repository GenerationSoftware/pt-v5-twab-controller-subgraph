import { BigInt } from '@graphprotocol/graph-ts';

import { Vault } from '../../generated/schema';

export const increaseTotalSupply = (vault: Vault, amount: BigInt): void => {
    vault.totalSupply = vault.totalSupply.plus(amount);
};

export const decreaseTotalSupply = (vault: Vault, amount: BigInt): void => {
    vault.totalSupply = vault.totalSupply.minus(amount);
};
