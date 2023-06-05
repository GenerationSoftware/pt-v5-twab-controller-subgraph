import {
    IncreasedBalance,
    DecreasedBalance,
    IncreasedTotalSupply,
    DecreasedTotalSupply,
    Delegated,
    ObservationRecorded,
} from '../../generated/TwabController/TwabController';
import {
    increaseBalance,
    decreaseBalance,
    increaseDelegateBalance,
    decreaseDelegateBalance,
    setDelegate,
} from '../helpers/account';
import { increaseTotalSupply, decreaseTotalSupply } from '../helpers/vault';
import { createTwabObservation, setTwabObservation } from '../helpers/twabObservation';
import { createBalanceChange, setBalanceChange } from '../helpers/balanceChange';
import { loadOrCreateAccount } from '../helpers/loadOrCreateAccount';
import { loadOrCreateVault } from '../helpers/loadOrCreateVault';

export function handleIncreasedBalance(event: IncreasedBalance): void {
    const { vault, user, amount, delegateAmount } = event.params;

    const account = loadOrCreateAccount(vault, user);
    increaseBalance(account, amount);
    increaseDelegateBalance(account, delegateAmount);

    const timestamp = event.block.timestamp;
    const balanceChange = createBalanceChange(vault, user, timestamp);
    setBalanceChange(balanceChange, account, amount, delegateAmount, timestamp);

    balanceChange.save();
    account.save();
}

export function handleDecreasedBalance(event: DecreasedBalance): void {
    const { vault, user, amount, delegateAmount } = event.params;

    const account = loadOrCreateAccount(vault, user);
    decreaseBalance(account, amount);
    decreaseDelegateBalance(account, delegateAmount);

    const timestamp = event.block.timestamp;
    const balanceChange = createBalanceChange(vault, user, timestamp);
    setBalanceChange(balanceChange, account, amount.neg(), delegateAmount.neg(), timestamp);

    balanceChange.save();
    account.save();
}

export function handleIncreasedTotalSupply(event: IncreasedTotalSupply): void {
    const { vault, amount } = event.params;

    const vaultEntity = loadOrCreateVault(vault);
    increaseTotalSupply(vaultEntity, amount);

    vaultEntity.save();
}

export function handleDecreasedTotalSupply(event: DecreasedTotalSupply): void {
    const { vault, amount } = event.params;

    const vaultEntity = loadOrCreateVault(vault);
    decreaseTotalSupply(vaultEntity, amount);

    vaultEntity.save();
}

export function handleDelegated(event: Delegated): void {
    const { vault, delegator, delegate } = event.params;

    const delegatorAccount = loadOrCreateAccount(vault, delegator);
    const delegateAccount = loadOrCreateAccount(vault, delegate);

    setDelegate(delegatorAccount, delegateAccount.id);

    delegatorAccount.save();
    delegateAccount.save();
}

export function handleObservationRecorded(event: ObservationRecorded): void {
    const { vault, user, isNew, observation } = event.params;

    const account = loadOrCreateAccount(vault, user);
    account.delegateTwab = observation.cumulativeBalance;

    const timestamp = event.block.timestamp;
    const twabObservation = createTwabObservation(vault, user, timestamp);
    setTwabObservation(twabObservation, account, observation.cumulativeBalance, observation.balance, isNew, timestamp);

    account.save();
    twabObservation.save();
}