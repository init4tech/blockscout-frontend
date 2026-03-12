import { Box, Flex, Grid } from '@chakra-ui/react';
import React from 'react';

import type { SignetFill } from 'types/api/signetActivity';

import { route } from 'nextjs/routes';

import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import IconSvg from 'ui/shared/IconSvg';

import formatTokenAmount from './formatTokenAmount';

interface Props {
  readonly fill: SignetFill;
  readonly isLoading: boolean;
}

const FillCard = ({ fill, isLoading }: Props) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="border.divider"
      borderRadius="base"
      p={ 4 }
    >
      <Flex alignItems="center" gap={ 2 } mb={ 3 } minW={ 0 }>
        <Skeleton loading={ isLoading } fontWeight={ 600 } textStyle="sm">
          Fill
        </Skeleton>
        <Skeleton loading={ isLoading } minW={ 0 }>
          <Flex alignItems="center" gap={ 1 } minW={ 0 }>
            <Link href={ route({ pathname: '/tx/[hash]', query: { hash: fill.fill_tx_hash } }) }>
              <HashStringShortenDynamic hash={ fill.fill_tx_hash }/>
            </Link>
          </Flex>
        </Skeleton>
      </Flex>

      <Grid templateColumns={{ base: '1fr', lg: '100px 1fr' }} gap={ 2 } textStyle="sm">
        <Skeleton loading={ isLoading } color="text.secondary" fontWeight={ 500 }>
          Filler
        </Skeleton>
        <AddressEntity
          address={{ hash: fill.filler }}
          isLoading={ isLoading }
          truncation="constant"
        />

        <Skeleton loading={ isLoading } color="text.secondary" fontWeight={ 500 }>
          Outputs
        </Skeleton>
        <Flex flexDir="column" gap={ 1 }>
          { fill.outputs.map((output, idx) => (
            <Flex key={ idx } alignItems="center" gap={ 1 }>
              <Skeleton loading={ isLoading }>
                { formatTokenAmount(output) }
              </Skeleton>
              { output.chain_id && (
                <Tooltip content={ `Destination chain: ${ output.chain_id }` }>
                  <IconSvg name="navigation/cross_chain_txs" boxSize={ 4 } color="icon.secondary" cursor="pointer"/>
                </Tooltip>
              ) }
            </Flex>
          )) }
        </Flex>

        <Skeleton loading={ isLoading } color="text.secondary" fontWeight={ 500 }>
          Order
        </Skeleton>
        <Skeleton loading={ isLoading } minW={ 0 }>
          <HashStringShortenDynamic hash={ fill.order_hash }/>
        </Skeleton>
      </Grid>
    </Box>
  );
};

export default React.memo(FillCard);
