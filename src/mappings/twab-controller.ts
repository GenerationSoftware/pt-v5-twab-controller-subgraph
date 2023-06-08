import {
    IncreasedBalance,
    DecreasedBalance,
    IncreasedTotalSupply,
    DecreasedTotalSupply,
    Delegated,
    ObservationRecorded,
    TotalSupplyObservationRecorded,
} from '../../generated/TwabController/TwabController';
import { createAccountObservation } from '../helpers/accountObservation';
import { updateAccountBalance } from '../helpers/accountBalanceUpdate';
import { loadOrCreateAccount } from '../helpers/loadOrCreateAccount';
import { createVaultObservation } from '../helpers/vaultObservation';
import { updateVaultBalance } from '../helpers/vaultBalanceUpdate';
import { generateUniqueLogId } from '../helpers/common';

export function handleIncreasedBalance(event: IncreasedBalance): void {
    const { vault, user, amount, delegateAmount } = event.params;
    const updateId = generateUniqueLogId(event);
    updateAccountBalance(updateId, vault, user, amount, delegateAmount, event.block.timestamp);
}

export function handleDecreasedBalance(event: DecreasedBalance): void {
    const { vault, user, amount, delegateAmount } = event.params;
    const updateId = generateUniqueLogId(event);
    updateAccountBalance(updateId, vault, user, amount.neg(), delegateAmount.neg(), event.block.timestamp);
}

export function handleIncreasedTotalSupply(event: IncreasedTotalSupply): void {
    const { vault, amount, delegateAmount } = event.params;
    const updateId = generateUniqueLogId(event);
    updateVaultBalance(updateId, vault, amount, delegateAmount, event.block.timestamp);
}

export function handleDecreasedTotalSupply(event: DecreasedTotalSupply): void {
    const { vault, amount, delegateAmount } = event.params;
    const updateId = generateUniqueLogId(event);
    updateVaultBalance(updateId, vault, amount.neg(), delegateAmount.neg(), event.block.timestamp);
}

export function handleDelegated(event: Delegated): void {
    const { vault, delegator, delegate } = event.params;

    const delegatorAccount = loadOrCreateAccount(vault, delegator);
    const delegateAccount = loadOrCreateAccount(vault, delegate);

    delegatorAccount.delegate = delegateAccount.id;

    delegatorAccount.save();
    delegateAccount.save();
}

export function handleObservationRecorded(event: ObservationRecorded): void {
    const { vault, user, isNew, balance, delegateBalance, observation } = event.params;
    const observationId = generateUniqueLogId(event);
    createAccountObservation(observationId, vault, user, balance, delegateBalance, observation.cumulativeBalance, isNew, event.block.timestamp);
}

export function handleTotalSupplyObservationRecorded(event: TotalSupplyObservationRecorded): void {
    const { vault, isNew, balance, delegateBalance, observation } = event.params;
    const observationId = generateUniqueLogId(event);
    createVaultObservation(observationId, vault, balance, delegateBalance, observation.cumulativeBalance, isNew, event.block.timestamp);
}