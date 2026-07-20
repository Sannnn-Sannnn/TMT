import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: 3,
});

export const prisma = new PrismaClient({ adapter });
