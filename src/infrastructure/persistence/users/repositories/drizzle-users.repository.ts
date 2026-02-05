import { User } from '@/domain/users/entities/user.entity';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';
import { usersTable } from '@/infrastructure/database/schemas/drizzle-user.schema';
import { eq } from 'drizzle-orm';
import { DrizzleUserMapper } from '@/infrastructure/persistence/users/mappers/drizzle-user.mapper';
import { type DrizzleConnection } from '@/infrastructure/database';
import type { UUID } from '@/domain/common/value-objects/uuid.vo';
import type { Email } from '@/domain/common/value-objects/email.vo';

export class DrizzleUsersRepository implements UsersRepository {
  constructor(private readonly db: DrizzleConnection) {}

  async findAll(): Promise<User[]> {
    const users = await this.db.select().from(usersTable);
    return users.map((user) => DrizzleUserMapper.toDomain(user));
  }

  async findById(id: UUID): Promise<User | null> {
    const user = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id.props.value));

    if (user.length === 0) {
      return null;
    }

    return DrizzleUserMapper.toDomain(user[0]);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.props.value));
    if (user.length === 0) {
      return null;
    }
    return DrizzleUserMapper.toDomain(user[0]);
  }

  async create(user: User): Promise<User> {
    const userEntity = DrizzleUserMapper.toPersistence(user);
    const [createdUser] = await this.db
      .insert(usersTable)
      .values(userEntity)
      .returning();
    return DrizzleUserMapper.toDomain(createdUser);
  }

  async update(user: User): Promise<User> {
    const userEntity = DrizzleUserMapper.toPersistence(user);
    const [updatedUser] = await this.db
      .update(usersTable)
      .set(userEntity)
      .where(eq(usersTable.id, user.id.props.value))
      .returning();
    return DrizzleUserMapper.toDomain(updatedUser);
  }

  async delete(id: UUID): Promise<void> {
    await this.db.delete(usersTable).where(eq(usersTable.id, id.props.value));
  }
}
