import type { Session, User } from "better-auth"

export interface AuthService {
  handler(raw: Request): Promise<Response>
  getSession(headers: Headers): Promise<{ session: Session, user: User } | null>
}