import type { AuthService } from "@/application/common/interfaces/auth.service";
import type { LoggerService } from "@/application/common/interfaces/logger.service";
import type { DrizzleConnection } from "@/infrastructure/database";

export interface SharedTypes {
  DrizzleConnection: DrizzleConnection;

  // Services
  LoggerService: LoggerService;
  AuthService: AuthService;
}