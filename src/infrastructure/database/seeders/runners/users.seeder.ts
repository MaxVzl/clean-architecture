import { usersTable } from '@/infrastructure/database/schemas/drizzle-user.schema';
import { createUserFactory } from '../factories/user.factory';
import { faker } from '@faker-js/faker';
import type { DrizzleConnection } from '@/infrastructure/database';

export const seedUsers = async (db: DrizzleConnection, count = 10) => {
  console.log(`👤 Seeding ${count} users...`);

  const users = faker.helpers.multiple(createUserFactory, { count });

  await db.insert(usersTable).values(users);
};
