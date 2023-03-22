import {
    IncreasedBalance,
    DecreasedBalance,
    IncreasedTotalSupply,
    DecreasedTotalSupply,
    Delegated,
} from '../../generated/TwabController/TwabController';
import { setBalance, setDelegatee } from '../helpers/account';
import { createTwab } from '../helpers/createTwab';
import { loadOrCreateAccount } from '../helpers/loadOrCreateAccount';
import { setTwab } from '../helpers/twab';
import { log } from '@graphprotocol/graph-ts';

export function handleIncreasedBalance(event: IncreasedBalance): void {
    const vault = event.params.vault;
    const user = event.params.user;
    const amount = event.params.amount;
    const isNew = event.params.isNew;
    const eventTwab = event.params.twab;

    const account = loadOrCreateAccount(vault, user);

    log.info('Message to be displayed: {}, {}, {}, {}, {}', [
        vault.toString(),
        user.toString(),
        amount.toString(),
        isNew.toString(),
        eventTwab.toString(),
    ]);

    setBalance(account, amount);

    const timestamp = event.block.timestamp;
    const twab = createTwab(vault, user, timestamp);
    setTwab(twab, account, amount, timestamp);

    twab.save();
    account.save();
}

// export function handleIncreasedTotalSupply(event: IncreasedTotalSupply): void {
//     const vault = event.params.vault;
//     const newTwab = event.params.newTotalSupplyTwab;
//     log.info('Message to be displayed: {}, {}', [
//         vault.toString(),
//         // user.toString(),
//         newTwab.toString(),
//     ]);
// }

export function handleDelegated(event: Delegated): void {
    const vault = event.params.vault;
    const delegate = event.params.delegator;
    const delegatee = event.params.delegate;

    const delegateAccount = loadOrCreateAccount(vault, delegate);
    const delegateeAccount = loadOrCreateAccount(vault, delegatee);

    setDelegatee(delegateAccount, delegateeAccount.id);

    delegateAccount.save();
    delegateeAccount.save();
}
