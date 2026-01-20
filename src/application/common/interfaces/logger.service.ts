export interface LoggerService {
  log(message: string, data?: Record<string, unknown>): Promise<void>
}