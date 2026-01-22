import type { AuthService } from "@/application/common/interfaces/auth.service";
import type { LoggerService } from "@/application/common/interfaces/logger.service";
import { type DrizzleConnection } from "@/infrastructure/database";
import { accountsTable } from "@/infrastructure/persistence/accounts/entities/drizzle-account.entity";
import { sessionsTable } from "@/infrastructure/persistence/sessions/entities/drizzle-session.entity";
import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity";
import { verificationsTable } from "@/infrastructure/persistence/verifications/entities/drizzle-verification.entity";
import { betterAuth, type Session, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

function createAuthInstance(
  loggerService: LoggerService,
  db: DrizzleConnection,
) {
  return betterAuth({
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
      enabled: true,
      sendResetPassword: async ({user, url, token}, request) => {
        await loggerService.log(
          `Reset password email sent to ${user.email} with token ${token}`,
          { url, token }
        );
      }
    },
    plugins: [
      openAPI(),
    ],
    advanced: {
      disableOriginCheck: true
    }
  });
}

export class BetterAuthService implements AuthService {
  private readonly _auth: ReturnType<typeof createAuthInstance>;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly db: DrizzleConnection
  ) {
    this._auth = createAuthInstance(this.loggerService, this.db);
  }

  get auth() { return this._auth; }

  async handler(raw: Request): Promise<Response> {
    return this.auth.handler(raw);
  }

  async getSession(headers: Headers): Promise<{ session: Session, user: User } | null> {
    return this.auth.api.getSession({ headers });
  }
}