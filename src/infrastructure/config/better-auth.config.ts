import { db } from "@/infrastructure/database";
import { accountsTable } from "@/infrastructure/persistence/accounts/entities/drizzle-account.entity";
import { sessionsTable } from "@/infrastructure/persistence/sessions/entities/drizzle-session.entity";
import { verificationsTable } from "@/infrastructure/persistence/verifications/entities/drizzle-verification.entity";
import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, { 
    provider: "sqlite",
    schema: {
      user: usersTable,
      account: accountsTable,
      session: sessionsTable,
      verification: verificationsTable,
    },
  }),
  emailAndPassword: {    
    enabled: true
  },
  plugins: [
    openAPI(),
  ],
  advanced: {
    disableOriginCheck: true
  }
});