import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { Vault, VaultTwabObservation } from '../../generated/schema';
import { generateCompositeId } from './common';

export function createVaultTwabObservation(vaultId: Bytes, timestamp: BigInt): VaultTwabObservation {
    const compositeId = generateCompositeId(vaultId.toHexString(), timestamp.toHexString());
    let twabObservation = VaultTwabObservation.load(compositeId);

    // create case
    if (twabObservation == null) {
        twabObservation = new VaultTwabObservation(compositeId);
    }

    return twabObservation as VaultTwabObservation;
}

export const setVaultTwabObservation = (
    twabObservation: VaultTwabObservation,
    vault: Vault,
    balance: BigInt,
    delegateBalance: BigInt,
    delegateTwab: BigInt,
    isNew: boolean,
    timestamp: BigInt,
): void => {
    twabObservation.vault = vault.id;
    twabObservation.balance = balance;
    twabObservation.delegateTwab = delegateTwab;
    twabObservation.delegateBalance = delegateBalance;
    twabObservation.isNew = isNew;
    twabObservation.timestamp = timestamp;
};
