export interface AuthService {
  handler(raw: Request): Promise<Response>
  signIn(): Promise<string>
}