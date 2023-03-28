import { BigInt } from '@graphprotocol/graph-ts';

import { Account, Twab } from '../../generated/schema';

export const setTwab = (
    twab: Twab,
    account: Account,
    amount: BigInt,
    delegateAmount: BigInt,
    timestamp: BigInt,
): void => {
    twab.account = account.id;
    twab.amount = amount;
    twab.delegateBalance = delegateAmount;
    twab.timestamp = timestamp;
};
