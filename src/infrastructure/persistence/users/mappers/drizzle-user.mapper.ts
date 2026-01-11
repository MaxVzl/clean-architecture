import { UUID } from "@/domain/common/value-objects/uuid.vo";
import { User } from "@/domain/users/entities/user.entity";
import type { DrizzleUser } from "@/infrastructure/persistence/users/entities/drizzle-user.entity";

export class DrizzleUserMapper {
  static toDomain(user: DrizzleUser): User {
    return User.restore(
      new UUID(user.id),
      user.name,
      user.email,
      user.password,
      new Date(user.createdAt),
      new Date(user.updatedAt)
    )
  }

  static toPersistence(user: User): DrizzleUser {
    return {
      id: user.id.value,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }
  }
}