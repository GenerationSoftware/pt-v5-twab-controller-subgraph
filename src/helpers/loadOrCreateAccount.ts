import { Bytes } from '@graphprotocol/graph-ts';

import { Account, Vault, User } from '../../generated/schema';
import { generateCompositeId } from '../helpers/common';

export function loadOrCreateAccount(vaultId: Bytes, userId: Bytes): Account {
    loadOrCreateVault(vaultId);
    loadOrCreateUser(userId);

    const compositeId = generateCompositeId(vaultId.toHexString(), userId.toHexString());
    let account = Account.load(compositeId);

    // create case
    if (account == null) {
        account = new Account(compositeId);
    }

    return account as Account;
}

function loadOrCreateVault(id: Bytes): Vault {
    let vault = Vault.load(id);

    // create case
    if (vault == null) {
        vault = new Vault(id);
        vault.save();
    }

    return vault as Vault;
}

function loadOrCreateUser(id: Bytes): User {
    let user = User.load(id);

    // create case
    if (user == null) {
        user = new User(id);
        user.save();
    }

    return user as User;
}
