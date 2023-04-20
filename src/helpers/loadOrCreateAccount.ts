import { Bytes } from '@graphprotocol/graph-ts';

import { Account, Vault, User } from '../../generated/schema';
import { ZERO, generateCompositeId } from '../helpers/common';
import { loadOrCreateVault } from '../helpers/loadOrCreateVault';

export function loadOrCreateAccount(vaultId: Bytes, userId: Bytes): Account {
    loadOrCreateVault(vaultId);
    loadOrCreateUser(userId);

    const compositeId = generateCompositeId(vaultId.toHexString(), userId.toHexString());
    let account = Account.load(compositeId);

    // create case
    if (account == null) {
        account = new Account(compositeId);
        account.vault = vaultId;
        account.user = userId;
        account.balance = ZERO;
        account.delegateBalance = ZERO;
    }

    return account as Account;
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
