import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional()
});

export const env = envSchema.parse(process.env);
