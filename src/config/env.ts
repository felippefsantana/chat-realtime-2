import dotenv from "dotenv";
import path from "node:path";
import { z } from "zod";

const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({
  path: envPath,
});

const envSchema = z.object({
  NODE_ENV: z.string(),
  APP_HOST: z.string(),
  APP_PORT: z.coerce.number(),
  APP_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
});

const config = envSchema.parse(process.env);

export const env = config;
