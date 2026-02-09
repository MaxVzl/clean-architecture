import { Email } from '@/domain/common/value-objects/email.vo';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { User } from '@/domain/users/entities/user.entity';
import type { DrizzleUser } from '@/infrastructure/database/schemas/drizzle-user.schema';

export class DrizzleUserMapper {
  static toDomain(user: DrizzleUser): User {
    return User.restore(UUID.create(user.id), {
      name: user.name,
      email: Email.create(user.email),
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  static toPersistence(user: User): DrizzleUser {
    return {
      id: user.id.props.value,
      name: user.props.name,
      email: user.props.email.props.value,
      emailVerified: user.props.emailVerified,
      image: user.props.image,
      createdAt: user.props.createdAt,
      updatedAt: user.props.updatedAt,
    };
  }
}
