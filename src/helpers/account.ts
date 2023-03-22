import { BigInt } from '@graphprotocol/graph-ts';

import { Account } from '../../generated/schema';
// import { Ticket, Ticket__getAccountDetailsResultValue0Struct } from '../../generated/Ticket/Ticket';

// export const setTicket = (ticketAddress: string, account: Account): void => {
//     // If just created set ticket field
//     if (account.ticket == null) {
//         account.ticket = ticketAddress;
//     }
// };

export const setBalance = (account: Account, amount: BigInt): void => {
    account.balance = account.balance.plus(amount);
};

export const setDelegatee = (account: Account, delegateeId: string): void => {
    account.delegatee = delegateeId;
};
