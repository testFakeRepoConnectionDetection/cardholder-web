import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().default(8080),
  ISSUING_API_URL: z.string().url(),
  CARD_CONTROLS_URL: z.string().url(),
  AMQP_URL: z.string(),
  DIRECTORY_URL: z.string(),
  DIRECTORY_BASE_DN: z.string().default('ou=customers,dc=bank,dc=eu'),
  CHECKOUT_URL: z.string().url(),
  ADDRESS_CHECK_URL: z.string().url(),
  ADDRESS_CHECK_KEY: z.string().optional(),
});

export const config = schema.parse(process.env);
