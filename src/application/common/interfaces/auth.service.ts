export interface AuthService {
  handler(raw: Request): Promise<Response>
}