import type { usersTable } from '@/infrastructure/database/schemas/drizzle-user.schema';
import { faker } from '@faker-js/faker';

type NewUser = typeof usersTable.$inferInsert;

export const createUserFactory = (): NewUser => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: faker.datatype.boolean(),
    image: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
};
