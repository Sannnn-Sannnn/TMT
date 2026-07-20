import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().default(3000),
  FRONTEND_URL: z.url(),
});

export const env = envSchema.parse(process.env);
