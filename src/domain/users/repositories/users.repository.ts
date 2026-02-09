import type { BaseRepository } from '@/domain/common/repositories/base.repository';
import type { Email } from '@/domain/common/value-objects/email.vo';
import type { User } from '@/domain/users/entities/user.entity';

export interface UsersRepository extends BaseRepository<User> {
  findByEmail(email: Email): Promise<User | null>;
}
