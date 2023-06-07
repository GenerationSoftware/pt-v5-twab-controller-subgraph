import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { generateCompositeId } from './common';
import { Vault, VaultSupplyChange } from '../../generated/schema';

export function createVaultSupplyChange(vaultId: Bytes, timestamp: BigInt): VaultSupplyChange {
    const compositeId = generateCompositeId(vaultId.toHexString(), timestamp.toHexString());
    let supplyChange = VaultSupplyChange.load(compositeId);

    // create case
    if (supplyChange == null) {
        supplyChange = new VaultSupplyChange(compositeId);
    }

    return supplyChange as VaultSupplyChange;
}

export const setVaultSupplyChange = (
    supplyChange: VaultSupplyChange,
    vault: Vault,
    amount: BigInt,
    timestamp: BigInt,
): void => {
    supplyChange.vault = vault.id;
    supplyChange.amount = amount;
    supplyChange.newTotalSupply = vault.totalSupply;
    supplyChange.timestamp = timestamp;
};
