import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { Twab } from '../../generated/schema';
import { generateCompositeId } from './common';

export function createTwab(vaultId: Bytes, userId: Bytes, timestamp: BigInt): Twab {
    const accountCompositeId = generateCompositeId(vaultId.toHexString(), userId.toHexString());
    const compositeId = generateCompositeId(accountCompositeId, timestamp.toHexString());
    let twab = Twab.load(compositeId);

    // create case
    if (twab == null) {
        twab = new Twab(compositeId);
    }

    return twab as Twab;
}
