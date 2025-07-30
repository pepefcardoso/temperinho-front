import * as Sentry from '@sentry/nextjs';
import { Replay } from '@sentry/replay'; // Importação corrigida

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Replay({ // Usando a importação direta
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});