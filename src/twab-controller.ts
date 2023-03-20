import {
  Delegated as DelegatedEvent,
  NewTotalSupplyTwab as NewTotalSupplyTwabEvent,
  NewUserTwab as NewUserTwabEvent
} from "../generated/TwabController/TwabController"
import { Delegated, NewTotalSupplyTwab, NewUserTwab } from "../generated/schema"

export function handleDelegated(event: DelegatedEvent): void {
  let entity = new Delegated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vault = event.params.vault
  entity.delegator = event.params.delegator
  entity.delegate = event.params.delegate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewTotalSupplyTwab(event: NewTotalSupplyTwabEvent): void {
  let entity = new NewTotalSupplyTwab(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vault = event.params.vault
  entity.newTotalSupplyTwab_amount = event.params.newTotalSupplyTwab.amount
  entity.newTotalSupplyTwab_timestamp =
    event.params.newTotalSupplyTwab.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewUserTwab(event: NewUserTwabEvent): void {
  let entity = new NewUserTwab(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vault = event.params.vault
  entity.user = event.params.user
  entity.newTwab_amount = event.params.newTwab.amount
  entity.newTwab_timestamp = event.params.newTwab.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
