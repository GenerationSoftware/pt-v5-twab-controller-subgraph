import {
    Delegated,
    IncreasedBalance,
    DecreasedBalance,
    IncreasedTotalSupply,
    DecreasedTotalSupply,
} from '../../generated/TwabController/TwabController';
// import { setBalance, setDelegatee, setTwab } from '../helpers/account';
import { createTwab } from '../helpers/createTwab';
import { loadOrCreateAccount } from '../helpers/loadOrCreateAccount';
// import { setTwab } from '../helpers/twab';
import { log } from '@graphprotocol/graph-ts';

export function handleIncreasedBalance(event: IncreasedBalance): void {
    const vault = event.params.vault;
    const user = event.params.user;
    const amount = event.params.amount;
    const isNew = event.params.isNew;
    const eventTwab = event.params.twab;

    const account = loadOrCreateAccount(vault.toHexString(), user.toHexString());

    log.info('Message to be displayed: {}, {}, {}, {}, {}', [
        vault.toString(),
        user.toString(),
        amount.toString(),
        isNew.toString(),
        eventTwab.toString(),
    ]);

    const timestamp = event.block.timestamp;
    const twab = createTwab(vault.toHexString(), user.toHexString(), timestamp);

    // const account = loadOrCreateAccount(delegate.toHexString());
    // setTwab(ticketAddress, account);

    // const ticketContract = Twab.bind(event.address);
    // const delegateAccountDetails = ticketContract.getAccountDetails(delegate);
    // setBalance(account, ticketContract, delegate, delegateAccountDetails);

    // const timestamp = event.block.timestamp;
    // const twab = createTwab(generateCompositeId(delegate.toHexString(), timestamp.toHexString()));
    // setTwab(twab, account, delegateAccountDetails, event.params.newTwab.amount, timestamp);

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

// export function handleDelegated(event: Delegated): void {
//     const vault = event.params.vault;
//     const delegate = event.params.delegator;
//     const delegatee = event.params.delegate;

//     const ticketAddress = event.address.toHexString();
//     // loadOrCreateTwab(ticketAddress);

//     const delegateAccount = loadOrCreateAccount(vault, delegate);
//     // setTwab(ticketAddress, delegateAccount);

//     // const delegateeAccount = loadOrCreateAccount(delegatee.toHexString());
//     // setTwab(ticketAddress, delegateeAccount);

//     // setDelegatee(delegateAccount, delegateeAccount.id);

//     delegateAccount.save();
//     // delegateeAccount.save();
// }

// export function handleTransfer(event: Transfer): void {
//     const from = event.params.from;
//     const to = event.params.to;

//     const ticketAddress = event.address.toHexString();
//     loadOrCreateTwab(ticketAddress);

//     const fromAccount = loadOrCreateAccount(from.toHexString());
//     setTwab(ticketAddress, fromAccount);

//     const toAccount = loadOrCreateAccount(to.toHexString());
//     setTwab(ticketAddress, toAccount);

//     const ticketContract = Twab.bind(event.address);

//     const fromAccountDetails = ticketContract.getAccountDetails(from);
//     setBalance(fromAccount, ticketContract, from, fromAccountDetails);

//     const toAccountDetails = ticketContract.getAccountDetails(to);
//     setBalance(toAccount, ticketContract, to, toAccountDetails);

//     fromAccount.save();
//     toAccount.save();
// }

// import { Delegated, IncreasedTotalSupply, IncreasedBalance } from "../generated/schema"

// export function handleDelegated(event: DelegatedEvent): void {
//     let entity = new Delegated(event.transaction.hash.concatI32(event.logIndex.toI32()));
//     entity.vault = event.params.vault;
//     entity.delegator = event.params.delegator;
//     entity.delegate = event.params.delegate;

//     entity.blockNumber = event.block.number;
//     entity.blockTimestamp = event.block.timestamp;
//     entity.transactionHash = event.transaction.hash;

//     entity.save();
// }

// export function handleIncreasedTotalSupply(event: IncreasedTotalSupplyEvent): void {
//     let entity = new IncreasedTotalSupply(event.transaction.hash.concatI32(event.logIndex.toI32()));
//     entity.vault = event.params.vault;
//     entity.newTotalSupplyTwab_amount = event.params.newTotalSupplyTwab.amount;
//     entity.newTotalSupplyTwab_timestamp = event.params.newTotalSupplyTwab.timestamp;

//     entity.blockNumber = event.block.number;
//     entity.blockTimestamp = event.block.timestamp;
//     entity.transactionHash = event.transaction.hash;

//     entity.save();
// }

// export function handleIncreasedBalance(event: IncreasedBalanceEvent): void {
//     let entity = new IncreasedBalance(event.transaction.hash.concatI32(event.logIndex.toI32()));
//     entity.vault = event.params.vault;
//     entity.user = event.params.user;
//     entity.newTwab_amount = event.params.newTwab.amount;
//     entity.newTwab_timestamp = event.params.newTwab.timestamp;

//     entity.blockNumber = event.block.number;
//     entity.blockTimestamp = event.block.timestamp;
//     entity.transactionHash = event.transaction.hash;

//     entity.save();
// }
