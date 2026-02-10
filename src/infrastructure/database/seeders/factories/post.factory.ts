import type { postsTable } from '@/infrastructure/database/schemas/drizzle-post.schema';
import { faker } from '@faker-js/faker';

type NewPost = typeof postsTable.$inferInsert;

export const createPostFactory = (userId: string): NewPost => {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(2),
    userId,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  };
};
