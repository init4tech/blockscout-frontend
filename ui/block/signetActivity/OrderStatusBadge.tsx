import React from 'react';

import type { OrderStatus } from 'types/api/signetActivity';

import type { BadgeProps } from 'toolkit/chakra/badge';
import { Badge } from 'toolkit/chakra/badge';
import IconSvg from 'ui/shared/IconSvg';

interface Props extends BadgeProps {
  readonly status: OrderStatus;
}

const STATUS_CONFIG = {
  filled: { colorPalette: 'green', icon: 'status/success', label: 'Filled' },
  pending: { colorPalette: 'yellow', icon: 'status/pending', label: 'Pending' },
  expired: { colorPalette: 'red', icon: 'status/error', label: 'Expired' },
} as const;

const OrderStatusBadge = ({ status, ...rest }: Props) => {
  const cfg = STATUS_CONFIG[status];
  const iconElement = <IconSvg name={ cfg.icon } boxSize={ 2.5 }/>;

  return (
    <Badge colorPalette={ cfg.colorPalette } startElement={ iconElement } { ...rest }>
      { cfg.label }
    </Badge>
  );
};

export default React.memo(OrderStatusBadge);
