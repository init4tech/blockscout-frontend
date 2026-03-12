import { formatUnits } from 'viem';

import type { SignetTokenAmount } from 'types/api/signetActivity';

export default function formatTokenAmount(token: SignetTokenAmount): string {
  const formatted = formatUnits(BigInt(token.amount), token.decimals);
  return `${ formatted } ${ token.token_symbol }`;
}
