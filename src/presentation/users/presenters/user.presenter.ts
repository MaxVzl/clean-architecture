import type { User } from '@/domain/users/entities/user.entity';
import type { UserSchema } from '@/presentation/users/schemas/user.schema';

export class UserPresenter {
  static toResponse(user: User): UserSchema {
    return {
      id: user.id.value,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
