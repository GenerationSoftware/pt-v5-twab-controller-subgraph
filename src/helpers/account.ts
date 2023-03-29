import { BigInt } from '@graphprotocol/graph-ts';

import { Account } from '../../generated/schema';

export const increaseBalance = (account: Account, amount: BigInt): void => {
    account.balance = account.balance.plus(amount);
};

export const decreaseBalance = (account: Account, amount: BigInt): void => {
    account.balance = account.balance.minus(amount);
};

export const setDelegatee = (account: Account, delegateeId: string): void => {
    account.delegatee = delegateeId;
};
