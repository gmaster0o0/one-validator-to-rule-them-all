import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';
import en from '../../../public/i18n/en.json';
import hu from '../../../public/i18n/hu.json';
import es from '../../../public/i18n/es.json';
import pl from '../../../public/i18n/pl.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, hu, es, pl },
    translocoConfig: {
      availableLangs: ['en', 'hu', 'es', 'pl'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
