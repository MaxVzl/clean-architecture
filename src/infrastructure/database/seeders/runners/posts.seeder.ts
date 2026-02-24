import type { DrizzleConnection } from '@/infrastructure/database';
import { postsTable } from '@/infrastructure/database/schemas/drizzle-post.schema';
import { usersTable } from '@/infrastructure/database/schemas/drizzle-user.schema';
import { createPostFactory } from '@/infrastructure/database/seeders/factories/post.factory';
import { faker } from '@faker-js/faker';

export const seedPosts = async (db: DrizzleConnection, maxPostsPerUser = 5) => {
  console.log('📝 Seeding posts...');

  const users = await db.select({ id: usersTable.id }).from(usersTable);

  if (users.length === 0) {
    console.warn('⚠️ Aucun utilisateur trouvé. Impossible de créer des posts.');
    return;
  }

  const posts: (typeof postsTable.$inferInsert)[] = [];

  for (const user of users) {
    const numberOfPosts = faker.number.int({ min: 1, max: maxPostsPerUser });

    for (let i = 0; i < numberOfPosts; i++) {
      posts.push(createPostFactory(user.id));
    }
  }

  if (posts.length > 0) {
    await db.insert(postsTable).values(posts);
  }
};
