import { db } from "@/infrastructure/database";
import { accountsTable } from "@/infrastructure/persistence/accounts/entities/drizzle-account.entity";
import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, { 
    provider: "sqlite",
    schema: {
      user: usersTable,
      account: accountsTable,
    },
  }),
  emailAndPassword: {    
    enabled: true
  }
});