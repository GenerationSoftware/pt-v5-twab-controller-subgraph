import { BigInt } from '@graphprotocol/graph-ts';

import { Account } from '../../generated/schema';

export const increaseBalance = (account: Account, amount: BigInt): void => {
    account.balance = account.balance.plus(amount);
};

export const decreaseBalance = (account: Account, amount: BigInt): void => {
    account.balance = account.balance.minus(amount);
};

export const increaseDelegateBalance = (account: Account, amount: BigInt): void => {
    account.delegateBalance = account.delegateBalance.plus(amount);
};

export const decreaseDelegateBalance = (account: Account, amount: BigInt): void => {
    account.delegateBalance = account.delegateBalance.minus(amount);
};

export const setDelegatee = (account: Account, delegateeId: string): void => {
    account.delegatee = delegateeId;
};
