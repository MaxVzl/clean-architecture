import type { BaseRepository } from "@/domain/common/repositories/base.repository";
import { User } from "@/domain/users/entities/user.entity";

export interface UsersRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}