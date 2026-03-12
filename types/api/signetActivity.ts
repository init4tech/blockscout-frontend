export const ORDER_STATUSES = {
  filled: 'filled',
  pending: 'pending',
  expired: 'expired',
} as const;

export type OrderStatus = typeof ORDER_STATUSES[keyof typeof ORDER_STATUSES];

export interface SignetTokenAmount {
  readonly token_symbol: string;
  readonly token_address: string;
  readonly amount: string;
  readonly decimals: number;
}

export interface SignetOutput extends SignetTokenAmount {
  readonly chain_id: string | null;
  readonly recipient: string;
}

export interface SignetOrder {
  readonly order_hash: string;
  readonly status: OrderStatus;
  readonly inputs: ReadonlyArray<SignetTokenAmount>;
  readonly outputs: ReadonlyArray<SignetOutput>;
  readonly deadline: string;
  readonly sender: string;
  readonly fill_tx_hash: string | null;
}

export interface SignetFill {
  readonly fill_tx_hash: string;
  readonly filler: string;
  readonly outputs: ReadonlyArray<SignetOutput>;
  readonly order_hash: string;
}

export interface BlockSignetActivity {
  readonly orders: ReadonlyArray<SignetOrder>;
  readonly fills: ReadonlyArray<SignetFill>;
}
