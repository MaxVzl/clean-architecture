import { postsTable } from '@/infrastructure/database/schemas/drizzle-post.schema';
import { usersTable } from '@/infrastructure/database/schemas/drizzle-user.schema';
import { db } from '@/infrastructure/database/seeders/main.seeder';
import { faker } from '@faker-js/faker';

export const seedPosts = async (maxPostsPerUser = 5) => {
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
      posts.push({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(2),
        userId: user.id,
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      });
    }
  }

  if (posts.length > 0) {
    await db.insert(postsTable).values(posts);
  }
};
