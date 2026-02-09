import { Entity } from '@/domain/common/entity';
import { Email } from '@/domain/common/value-objects/email.vo';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
});

export type CreateUserProps = z.infer<typeof createUserSchema>;

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

  static create(props: CreateUserProps, id?: UUID): User {
    const data = this.validate(createUserSchema, props, 'User');

    return new User(
      {
        name: data.name,
        email: Email.create(data.email),
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
