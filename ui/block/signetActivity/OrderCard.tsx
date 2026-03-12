import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import React from 'react';

import type { SignetOrder } from 'types/api/signetActivity';

import { route } from 'nextjs/routes';

import dayjs from 'lib/date/dayjs';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import IconSvg from 'ui/shared/IconSvg';

import formatTokenAmount from './formatTokenAmount';
import OrderStatusBadge from './OrderStatusBadge';

interface Props {
  readonly order: SignetOrder;
  readonly isLoading: boolean;
}

const OrderCard = ({ order, isLoading }: Props) => {
  const deadlineDate = dayjs(order.deadline);
  const isExpired = deadlineDate.isBefore(dayjs());

  return (
    <Box
      borderWidth="1px"
      borderColor="border.divider"
      borderRadius="base"
      p={ 4 }
    >
      <Flex justifyContent="space-between" alignItems="center" mb={ 3 }>
        <Flex alignItems="center" gap={ 2 } minW={ 0 }>
          <Skeleton loading={ isLoading } fontWeight={ 600 } textStyle="sm">
            Order
          </Skeleton>
          <Skeleton loading={ isLoading } minW={ 0 }>
            <Flex alignItems="center" gap={ 1 } minW={ 0 }>
              <HashStringShortenDynamic hash={ order.order_hash }/>
              <CopyToClipboard text={ order.order_hash }/>
            </Flex>
          </Skeleton>
        </Flex>
        <OrderStatusBadge status={ order.status } loading={ isLoading }/>
      </Flex>

      <Grid templateColumns={{ base: '1fr', lg: '100px 1fr' }} gap={ 2 } textStyle="sm">
        <Skeleton loading={ isLoading } color="text.secondary" fontWeight={ 500 }>
          Sender
        </Skeleton>
        <AddressEntity
          address={{ hash: order.sender }}
          isLoading={ isLoading }
          truncation="constant"
        />

        <Skeleton loading={ isLoading } color="text.secondary" fontWeight={ 500 }>
          Inputs
        </Skeleton>
        <Flex flexDir="column" gap={ 1 }>
          { order.inputs.map((input, idx) => (
            <Skeleton key={ idx } loading={ isLoading }>
              { formatTokenAmount(input) }
            </Skeleton>
          )) }
        </Flex>

        <Skeleton loading={ isLoading } color="text.secondary" fontWeight={ 500 }>
          Outputs
        </Skeleton>
        <Flex flexDir="column" gap={ 1 }>
          { order.outputs.map((output, idx) => (
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
          Deadline
        </Skeleton>
        <Skeleton loading={ isLoading }>
          <Tooltip content={ deadlineDate.format('llll') }>
            <Text as="span" color={ isExpired ? 'text.secondary' : undefined }>
              { deadlineDate.fromNow() }
            </Text>
          </Tooltip>
        </Skeleton>

        { order.fill_tx_hash && (
          <>
            <Skeleton loading={ isLoading } color="text.secondary" fontWeight={ 500 }>
              Fill tx
            </Skeleton>
            <Skeleton loading={ isLoading }>
              <Link href={ route({ pathname: '/tx/[hash]', query: { hash: order.fill_tx_hash } }) }>
                <HashStringShortenDynamic hash={ order.fill_tx_hash }/>
              </Link>
            </Skeleton>
          </>
        ) }
      </Grid>
    </Box>
  );
};

export default React.memo(OrderCard);
