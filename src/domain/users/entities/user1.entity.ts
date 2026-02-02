import { Entity1 } from "@/domain/common/entity1";
import { Email, emailSchema } from "@/domain/common/value-objects/email.vo";
import { UUID } from "@/domain/common/value-objects/uuid.vo";
import { z } from "zod";

export const createUser1Schema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: z.string().min(8),
})

interface User1Props {
  name: string;
  email: Email;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUser1DTO = z.infer<typeof createUser1Schema>;

export class User1 extends Entity1<User1Props> {
  private constructor(props: User1Props, id?: UUID) {
    super(props, id);
  }

  static create(props: CreateUser1DTO, id?: UUID): User1 {
    const result = createUser1Schema.safeParse(props);

    if (!result.success) {
      const errorMessage = result.error.issues.map(issue => issue.message).join(", ");
      throw new Error(`Validation Order échouée : ${errorMessage}`);
    }

    const data = result.data;

    const emailVO = Email.create(data.email);
    
    return new User1({
      name: data.name,
      email: emailVO,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, id);
  }
}

const user1 = User1.create({
  name: "John Doe",
  email: "john.doe@example.com",
  password: "password",
});

console.log(user1);