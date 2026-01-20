import type { LoggerService } from "@/application/common/interfaces/logger.service";

export class MyLoggerService implements LoggerService {
  async log(message: string, data?: Record<string, unknown>): Promise<void> {
    console.log(message, data);
  }
}