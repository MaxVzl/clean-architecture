export interface LoggerService {
  log(message: string): Promise<void>
}