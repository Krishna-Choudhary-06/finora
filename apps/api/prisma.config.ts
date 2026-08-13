import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export default defineConfig({
  earlyAccess: true,
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
  migrate: {
    url: process.env.DATABASE_URL as string,
  }
})
