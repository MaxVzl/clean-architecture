import type { AuthSessionDto } from '@/application/common/dto/auth-session.dto';
import type { AuthUserDto } from '@/application/common/dto/auth-user.dto';

export interface AuthService {
  handler(raw: Request): Promise<Response>;
  getSession(
    headers: Headers,
  ): Promise<{ session: AuthSessionDto; user: AuthUserDto } | null>;
}
