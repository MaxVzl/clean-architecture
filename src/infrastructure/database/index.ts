import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

export type DrizzleConnection = ReturnType<typeof drizzle>;

export const createDatabase = (databaseUrl: string): DrizzleConnection => {
  return drizzle(databaseUrl);
};
