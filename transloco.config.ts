import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'frontend/public/i18n/',
  langs: ['en', 'hu', 'es'],
  keysManager: {
    input: ['frontend/src', 'shared/schema/src'],
    output: 'frontend/public/i18n',
  },
};

export default config;
