import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import React from 'react';

import { Badge } from 'toolkit/chakra/badge';
import { Skeleton } from 'toolkit/chakra/skeleton';
import DataListDisplay from 'ui/shared/DataListDisplay';

import FillCard from './FillCard';
import OrderCard from './OrderCard';
import type { BlockSignetActivityQuery } from './useBlockSignetActivityQuery';

interface Props {
  readonly query: BlockSignetActivityQuery;
}

const SignetActivityTab = ({ query }: Props) => {
  const { data, isPlaceholderData, isError } = query;

  const orderCount = data?.orders.length ?? 0;
  const fillCount = data?.fills.length ?? 0;
  const totalCount = orderCount + fillCount;

  const content = data ? (
    <Flex flexDir="column" gap={ 6 }>
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={ 3 }>
        <Skeleton loading={ isPlaceholderData }>
          <Flex
            borderWidth="1px"
            borderColor="border.divider"
            borderRadius="base"
            p={ 4 }
            alignItems="center"
            gap={ 2 }
          >
            <Text fontWeight={ 500 }>Total activity</Text>
            <Badge colorPalette="cyan">{ totalCount }</Badge>
          </Flex>
        </Skeleton>
        <Skeleton loading={ isPlaceholderData }>
          <Flex
            borderWidth="1px"
            borderColor="border.divider"
            borderRadius="base"
            p={ 4 }
            alignItems="center"
            gap={ 2 }
          >
            <Text fontWeight={ 500 }>Orders</Text>
            <Badge colorPalette="cyan">{ orderCount }</Badge>
          </Flex>
        </Skeleton>
        <Skeleton loading={ isPlaceholderData }>
          <Flex
            borderWidth="1px"
            borderColor="border.divider"
            borderRadius="base"
            p={ 4 }
            alignItems="center"
            gap={ 2 }
          >
            <Text fontWeight={ 500 }>Fills</Text>
            <Badge colorPalette="cyan">{ fillCount }</Badge>
          </Flex>
        </Skeleton>
      </Grid>

      { orderCount > 0 && (
        <Box>
          <Text fontWeight={ 600 } mb={ 3 }>Orders</Text>
          <Flex flexDir="column" gap={ 3 }>
            { data.orders.map((order) => (
              <OrderCard key={ order.order_hash } order={ order } isLoading={ isPlaceholderData }/>
            )) }
          </Flex>
        </Box>
      ) }

      { fillCount > 0 && (
        <Box>
          <Text fontWeight={ 600 } mb={ 3 }>Fills</Text>
          <Flex flexDir="column" gap={ 3 }>
            { data.fills.map((fill) => (
              <FillCard key={ fill.fill_tx_hash } fill={ fill } isLoading={ isPlaceholderData }/>
            )) }
          </Flex>
        </Box>
      ) }
    </Flex>
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      itemsNum={ totalCount }
      emptyText="There is no Signet activity for this block."
    >
      { content }
    </DataListDisplay>
  );
};

export default React.memo(SignetActivityTab);
