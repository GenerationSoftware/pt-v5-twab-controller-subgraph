import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { Account, TwabObservation } from '../../generated/schema';
import { generateCompositeId } from './common';

export function createTwabObservation(vaultId: Bytes, userId: Bytes, timestamp: BigInt): TwabObservation {
    const accountCompositeId = generateCompositeId(vaultId.toHexString(), userId.toHexString());
    const compositeId = generateCompositeId(accountCompositeId, timestamp.toHexString());
    let twabObservation = TwabObservation.load(compositeId);

    // create case
    if (twabObservation == null) {
        twabObservation = new TwabObservation(compositeId);
    }

    return twabObservation as TwabObservation;
}

export const setTwabObservation = (
    twabObservation: TwabObservation,
    account: Account,
    delegateTwab: BigInt,
    delegateBalance: BigInt,
    isNew: boolean,
    timestamp: BigInt,
): void => {
    twabObservation.account = account.id;
    twabObservation.delegateTwab = delegateTwab;
    twabObservation.delegateBalance = delegateBalance;
    twabObservation.isNew = isNew;
    twabObservation.timestamp = timestamp;
};
