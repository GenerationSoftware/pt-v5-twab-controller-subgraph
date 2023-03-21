import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll,
} from 'matchstick-as/assembly/index';
import { Address } from '@graphprotocol/graph-ts';
import { Delegated } from '../generated/schema';
import { Delegated as DelegatedEvent } from '../generated/TwabController/TwabController';
import { handleDelegated } from '../src/mappings/twab-controller';
import { createDelegatedEvent } from './twab-controller-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
    beforeAll(() => {
        let vault = Address.fromString('0x0000000000000000000000000000000000000001');
        let delegator = Address.fromString('0x0000000000000000000000000000000000000001');
        let delegate = Address.fromString('0x0000000000000000000000000000000000000001');
        let newDelegatedEvent = createDelegatedEvent(vault, delegator, delegate);
        handleDelegated(newDelegatedEvent);
    });

    afterAll(() => {
        clearStore();
    });

    // For more test scenarios, see:
    // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

    test('Delegated created and stored', () => {
        assert.entityCount('Delegated', 1);

        // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
        assert.fieldEquals(
            'Delegated',
            '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
            'vault',
            '0x0000000000000000000000000000000000000001',
        );
        assert.fieldEquals(
            'Delegated',
            '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
            'delegator',
            '0x0000000000000000000000000000000000000001',
        );
        assert.fieldEquals(
            'Delegated',
            '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
            'delegate',
            '0x0000000000000000000000000000000000000001',
        );

        // More assert options:
        // https://thegraph.com/docs/en/developer/matchstick/#asserts
    });
});
