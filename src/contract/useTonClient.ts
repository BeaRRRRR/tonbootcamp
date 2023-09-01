import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from 'ton';
import { useAsyncInitialize } from './useAsyncInitialize';
import { config } from '../config';

export function useTonClient() {
    return useAsyncInitialize(
        async () =>
            new TonClient({
                endpoint: await getHttpEndpoint({
                  network: 'testnet'
                }),
            }),
    );
}
