import {
    IncreasedBalance,
    DecreasedBalance,
    IncreasedTotalSupply,
    DecreasedTotalSupply,
    Delegated,
    ObservationRecorded,
    TotalSupplyObservationRecorded,
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
import { createVaultSupplyChange, setVaultSupplyChange } from '../helpers/vaultSupplyChange';
import { createVaultTwabObservation, setVaultTwabObservation } from '../helpers/vaultTwabObservation';

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

    const timestamp = event.block.timestamp;
    const supplyChange = createVaultSupplyChange(vault, timestamp);
    setVaultSupplyChange(supplyChange, vaultEntity, amount, timestamp);

    supplyChange.save();
    vaultEntity.save();
}

export function handleDecreasedTotalSupply(event: DecreasedTotalSupply): void {
    const { vault, amount } = event.params;

    const vaultEntity = loadOrCreateVault(vault);
    decreaseTotalSupply(vaultEntity, amount);

    const timestamp = event.block.timestamp;
    const supplyChange = createVaultSupplyChange(vault, timestamp);
    setVaultSupplyChange(supplyChange, vaultEntity, amount.neg(), timestamp);

    supplyChange.save();
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
    const { vault, user, isNew, balance, delegateBalance, observation } = event.params;

    const account = loadOrCreateAccount(vault, user);
    account.delegateTwab = observation.cumulativeBalance;

    const timestamp = event.block.timestamp;
    const twabObservation = createTwabObservation(vault, user, timestamp);
    setTwabObservation(twabObservation, account, balance, delegateBalance, observation.cumulativeBalance, isNew, timestamp);

    twabObservation.save();
    account.save();
}

export function handleTotalSupplyObservationRecorded(event: TotalSupplyObservationRecorded): void {
    const { vault, isNew, balance, delegateBalance, observation } = event.params;

    const vaultEntity = loadOrCreateVault(vault);
    vaultEntity.totalDelegateTwab = observation.cumulativeBalance;

    const timestamp = event.block.timestamp;
    const vaultTwabObservation = createVaultTwabObservation(vault, timestamp);
    setVaultTwabObservation(vaultTwabObservation, vaultEntity, balance, delegateBalance, observation.cumulativeBalance, isNew, timestamp);

    vaultTwabObservation.save();
    vaultEntity.save();
}