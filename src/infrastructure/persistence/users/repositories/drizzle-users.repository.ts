import { User } from "@/domain/users/entities/user.entity";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";
import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity";
import { eq } from "drizzle-orm";
import { DrizzleUserMapper } from "@/infrastructure/persistence/users/mappers/drizzle-user.mapper";
import { db } from "@/infrastructure/database";

export class DrizzleUsersRepository implements UsersRepository {
  async findAll(): Promise<User[]> {
    const users = await db.select().from(usersTable)
    return users.map((user) => DrizzleUserMapper.toDomain(user))
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id))
    
    if (user.length === 0) {
      return null
    }

    return DrizzleUserMapper.toDomain(user[0])
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if (user.length === 0) {
      return null
    }
    return DrizzleUserMapper.toDomain(user[0])
  }

  async create(user: User): Promise<User> {
    const userEntity = DrizzleUserMapper.toPersistence(user)
    const [createdUser] = await db.insert(usersTable).values(userEntity).returning()
    return DrizzleUserMapper.toDomain(createdUser)
  }

  async update(user: User): Promise<User> {
    const userEntity = DrizzleUserMapper.toPersistence(user)
    const [updatedUser] = await db.update(usersTable).set(userEntity).where(eq(usersTable.id, user.id.value)).returning()
    return DrizzleUserMapper.toDomain(updatedUser)
  }

  async delete(id: string): Promise<void> {
    await db.delete(usersTable).where(eq(usersTable.id, id))
  }
}