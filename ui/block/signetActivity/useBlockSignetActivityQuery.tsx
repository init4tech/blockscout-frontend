import { useQuery } from '@tanstack/react-query';

import type { BlockSignetActivity } from 'types/api/signetActivity';

import config from 'configs/app';

interface Params {
  readonly heightOrHash: string;
  readonly tab: string;
  readonly isBlockLoaded: boolean;
}

export interface BlockSignetActivityQuery {
  readonly data: BlockSignetActivity | undefined;
  readonly isLoading: boolean;
  readonly isPlaceholderData: boolean;
  readonly isError: boolean;
}

const PLACEHOLDER_DATA: BlockSignetActivity = {
  orders: Array.from({ length: 3 }, (_, i) => ({
    order_hash: `0x${ String(i).padStart(64, '0') }`,
    status: 'pending' as const,
    inputs: [{ token_symbol: 'ETH', token_address: '0x0', amount: '1000000000000000000', decimals: 18 }],
    outputs: [{ token_symbol: 'USDC', token_address: '0x0', amount: '1000000', decimals: 6, chain_id: null, recipient: '0x0' }],
    deadline: new Date().toISOString(),
    sender: '0x0000000000000000000000000000000000000000',
    fill_tx_hash: null,
  })),
  fills: Array.from({ length: 2 }, (_, i) => ({
    fill_tx_hash: `0x${ String(i).padStart(64, 'f') }`,
    filler: '0x0000000000000000000000000000000000000000',
    outputs: [{ token_symbol: 'ETH', token_address: '0x0', amount: '1000000000000000000', decimals: 18, chain_id: null, recipient: '0x0' }],
    order_hash: `0x${ String(i).padStart(64, '0') }`,
  })),
};

async function fetchSignetActivity(heightOrHash: string, baseUrl: string): Promise<BlockSignetActivity> {
  const url = `${ baseUrl }/api/v2/blocks/${ heightOrHash }/signet-activity`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch signet activity: ${ response.statusText }`);
  }

  return response.json() as Promise<BlockSignetActivity>;
}

export default function useBlockSignetActivityQuery({ heightOrHash, tab, isBlockLoaded }: Params): BlockSignetActivityQuery {
  const feature = config.features.signetActivity;

  const query = useQuery<BlockSignetActivity>({
    queryKey: [ 'signet_activity', { heightOrHash } ],
    queryFn: () => {
      if (!feature.isEnabled) {
        throw new Error('Signet activity feature is not enabled');
      }

      const baseUrl = feature.apiEndpoint || '';
      return fetchSignetActivity(heightOrHash, baseUrl);
    },
    enabled: Boolean(feature.isEnabled && tab === 'signet_activity' && isBlockLoaded),
    placeholderData: PLACEHOLDER_DATA,
    refetchOnMount: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isPlaceholderData: query.isPlaceholderData,
    isError: query.isError,
  };
}
