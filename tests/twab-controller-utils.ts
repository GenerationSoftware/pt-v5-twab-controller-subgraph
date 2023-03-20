import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  Delegated,
  NewTotalSupplyTwab,
  NewUserTwab
} from "../generated/TwabController/TwabController"

export function createDelegatedEvent(
  vault: Address,
  delegator: Address,
  delegate: Address
): Delegated {
  let delegatedEvent = changetype<Delegated>(newMockEvent())

  delegatedEvent.parameters = new Array()

  delegatedEvent.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  )
  delegatedEvent.parameters.push(
    new ethereum.EventParam("delegator", ethereum.Value.fromAddress(delegator))
  )
  delegatedEvent.parameters.push(
    new ethereum.EventParam("delegate", ethereum.Value.fromAddress(delegate))
  )

  return delegatedEvent
}

export function createNewTotalSupplyTwabEvent(
  vault: Address,
  newTotalSupplyTwab: ethereum.Tuple
): NewTotalSupplyTwab {
  let newTotalSupplyTwabEvent = changetype<NewTotalSupplyTwab>(newMockEvent())

  newTotalSupplyTwabEvent.parameters = new Array()

  newTotalSupplyTwabEvent.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  )
  newTotalSupplyTwabEvent.parameters.push(
    new ethereum.EventParam(
      "newTotalSupplyTwab",
      ethereum.Value.fromTuple(newTotalSupplyTwab)
    )
  )

  return newTotalSupplyTwabEvent
}

export function createNewUserTwabEvent(
  vault: Address,
  user: Address,
  newTwab: ethereum.Tuple
): NewUserTwab {
  let newUserTwabEvent = changetype<NewUserTwab>(newMockEvent())

  newUserTwabEvent.parameters = new Array()

  newUserTwabEvent.parameters.push(
    new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
  )
  newUserTwabEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  newUserTwabEvent.parameters.push(
    new ethereum.EventParam("newTwab", ethereum.Value.fromTuple(newTwab))
  )

  return newUserTwabEvent
}
