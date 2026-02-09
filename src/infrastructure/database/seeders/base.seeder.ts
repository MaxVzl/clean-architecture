import { createDatabase } from '@/infrastructure/database';
import { postsTable } from '@/infrastructure/database/schemas/drizzle-post.schema';
import { usersTable } from '@/infrastructure/database/schemas/drizzle-user.schema';
import { faker } from '@faker-js/faker';

const databaseUrl = process.env.DB_FILE_NAME;
if (!databaseUrl) {
  throw new Error('DB_FILE_NAME environment variable is required');
}

const db = createDatabase(databaseUrl);

const createRandomUser = (): typeof usersTable.$inferInsert => {
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

const createRandomPost = (userId: string): typeof postsTable.$inferInsert => {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(2),
    userId,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  };
};

const seed = async () => {
  console.log('🌱 Seeding start...');

  const users = faker.helpers.multiple(createRandomUser, {
    count: 10,
  });

  const posts = users.flatMap((user) => {
    const numberOfPosts = faker.number.int({ min: 1, max: 5 });

    return faker.helpers.multiple(() => createRandomPost(user.id), {
      count: numberOfPosts,
    });
  });

  await db.insert(usersTable).values(users);
  await db.insert(postsTable).values(posts);

  console.log('✅ Seeding terminé !');
};

seed();
