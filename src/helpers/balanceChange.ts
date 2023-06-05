import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { generateCompositeId } from './common';
import { Account, BalanceChange } from '../../generated/schema';

export function createBalanceChange(vaultId: Bytes, userId: Bytes, timestamp: BigInt): BalanceChange {
    const accountCompositeId = generateCompositeId(vaultId.toHexString(), userId.toHexString());
    const compositeId = generateCompositeId(accountCompositeId, timestamp.toHexString());
    let balanceChange = BalanceChange.load(compositeId);

    // create case
    if (balanceChange == null) {
        balanceChange = new BalanceChange(compositeId);
    }

    return balanceChange as BalanceChange;
}

export const setBalanceChange = (
    balanceChange: BalanceChange,
    account: Account,
    amount: BigInt,
    delegateAmount: BigInt,
    timestamp: BigInt,
): void => {
    balanceChange.account = account.id;
    balanceChange.amount = amount;
    balanceChange.delegateAmount = delegateAmount;
    balanceChange.newBalance = account.balance;
    balanceChange.newDelegateBalance = account.delegateBalance;
    balanceChange.newBalance = 
    balanceChange.timestamp = timestamp;
};
