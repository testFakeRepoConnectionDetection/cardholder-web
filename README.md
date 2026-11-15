# cardholder-web

Backend-for-frontend of the EMEA cardholder web and mobile journeys: card activation, card controls
(freeze, online payments, contactless), PIN reveal with one-time password, and card fee payment.

## Run locally

```
npm ci
npm run dev
```

The service reads its configuration from environment variables (see `src/config.ts`). For local work
copy `.env.example` to `.env`; tests use WireMock stubs and need no other service.
