import type { User } from '@/domain/users/entities/user.entity';
import type { UserSchema } from '@/presentation/users/schemas/user.schema';

export class UserPresenter {
  static toResponse(user: User): UserSchema {
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
