import { Address, toNano } from 'ton-core';
import { NftCollection } from '../wrappers/NftCollection';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, receiver: Address) {
    const nftCollection = provider.open(await NftCollection.fromInit());

    await nftCollection.send(
        provider.sender(),
        {
            value: toNano('0.04'),
        },
        {
            $$type: 'Mint',
            queryId: 0n,
            receiver: receiver
        }
    );

    await provider.waitForDeploy(nftCollection.address);

    // run methods on `nftCollection`
}
