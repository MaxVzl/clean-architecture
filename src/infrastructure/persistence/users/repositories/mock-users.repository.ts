import type { Email } from '@/domain/common/value-objects/email.vo';
import type { UUID } from '@/domain/common/value-objects/uuid.vo';
import { User } from '@/domain/users/entities/user.entity';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';

export class MockUsersRepository implements UsersRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: UUID): Promise<User | null> {
    return this.users.find((user) => user.id.equals(id)) || null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.find((user) => user.props.email.equals(email)) || null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id.equals(user.id));
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = user;
    return user;
  }

  async delete(id: UUID): Promise<void> {
    this.users = this.users.filter((user) => !user.id.equals(id));
  }
}
