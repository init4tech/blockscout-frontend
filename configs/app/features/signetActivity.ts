import type { Feature } from './types';

import { getEnvValue } from '../utils';

const title = 'Signet activity';

const config: Feature<{
  readonly apiEndpoint: string | undefined;
}> = (() => {
  if (getEnvValue('NEXT_PUBLIC_SIGNET_ACTIVITY_ENABLED') === 'true') {
    return Object.freeze({
      title,
      isEnabled: true,
      apiEndpoint: getEnvValue('NEXT_PUBLIC_SIGNET_ACTIVITY_API_ENDPOINT'),
    });
  }

  return Object.freeze({
    title,
    isEnabled: false,
  });
})();

export default config;
