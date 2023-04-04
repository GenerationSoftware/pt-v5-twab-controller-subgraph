import {
    IncreasedBalance,
    DecreasedBalance,
    IncreasedTotalSupply,
    DecreasedTotalSupply,
    Delegated,
} from '../../generated/TwabController/TwabController';
import { increaseBalance, decreaseBalance, setDelegatee } from '../helpers/account';
import { createTwab } from '../helpers/createTwab';
import { loadOrCreateAccount } from '../helpers/loadOrCreateAccount';
import { setTwab } from '../helpers/twab';
import { log } from '@graphprotocol/graph-ts';

export function handleIncreasedBalance(event: IncreasedBalance): void {
    const vault = event.params.vault;
    const user = event.params.user;
    const amount = event.params.amount;
    const delegateAmount = event.params.delegateAmount;
    const isNew = event.params.isNew;

    const account = loadOrCreateAccount(vault, user);
    increaseBalance(account, amount);
    // increaseDelegateBalance(account, amount);

    const timestamp = event.block.timestamp;
    const twab = createTwab(vault, user, timestamp);
    setTwab(twab, account, amount, delegateAmount, isNew, timestamp);

    twab.save();
    account.save();
}

export function handleDecreasedBalance(event: DecreasedBalance): void {
    const vault = event.params.vault;
    const user = event.params.user;
    const amount = event.params.amount;
    const delegateAmount = event.params.delegateAmount;
    const isNew = event.params.isNew;

    const eventTwabAmount = event.params.twab.amount;

    log.info('decrease bal: {}, {}, {}, {}, {}, {}', [
        vault.toHexString(),
        user.toHexString(),
        amount.toString(),
        delegateAmount.toString(),
        isNew.toString(),
        eventTwabAmount.toString(),
    ]);

    const account = loadOrCreateAccount(vault, user);
    decreaseBalance(account, amount);

    const timestamp = event.block.timestamp;
    const twab = createTwab(vault, user, timestamp);
    setTwab(twab, account, amount, delegateAmount, isNew, timestamp);

    twab.save();
    account.save();
}

// only logs for the time being
export function handleIncreasedTotalSupply(event: IncreasedTotalSupply): void {
    const vault = event.params.vault;
    const amount = event.params.amount;
    const delegateAmount = event.params.delegateAmount;
    const isNew = event.params.isNew;
    const twab = event.params.twab;

    const eventTwabAmount = event.params.twab.amount;
    const eventTwabTimestamp = event.params.twab.timestamp;

    log.info('handleIncreasedTotalSupply: {}, {}, {}, {}, {}, {}', [
        vault.toHexString(),
        amount.toString(),
        delegateAmount.toString(),
        isNew.toString(),
        eventTwabAmount.toString(),
        eventTwabTimestamp.toString(),
    ]);
}

export function handleDecreasedTotalSupply(event: DecreasedTotalSupply): void {}

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
