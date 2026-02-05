import { Entity } from '@/domain/common/entity';
import { Email, emailSchema } from '@/domain/common/value-objects/email.vo';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

interface UserProps {
  name: string;
  email: Email;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UUID) {
    super(props, id);
  }

  static create(props: CreateUserDTO, id?: UUID): User {
    const result = createUserSchema.safeParse(props);

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(', ');
      throw new Error(`Validation User échouée : ${errorMessage}`);
    }

    const data = result.data;

    const emailVO = Email.create(data.email);

    return new User(
      {
        name: data.name,
        email: emailVO,
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );
  }

  static restore(id: UUID, props: UserProps): User {
    return new User(props, id);
  }

  // public changeEmail(email: Email): void {
  //   this.props = {
  //     ...this.props,
  //     email: email,
  //     updatedAt: new Date(),
  //   };
  // }

  public update(props: Partial<UserProps>): void {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    };
  }
}
