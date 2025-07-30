// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Ajuste este valor em produção ou use uma variável de ambiente
  tracesSampleRate: 1.0,

  // Note: remove a integração `BrowserTracing` se estiver usando o App Router.
  // O SDK do Next.js do Sentry injeta automaticamente a instrumentação de performance.
});