import 'dotenv/config';
import { seedUsers } from './runners/users.seeder';
import { seedPosts } from './runners/posts.seeder';
import { createDatabase } from '@/infrastructure/database';
import { usersTable } from '@/infrastructure/database/schemas/drizzle-user.schema';
import { postsTable } from '@/infrastructure/database/schemas/drizzle-post.schema';

const databaseUrl = process.env.DB_FILE_NAME;
if (!databaseUrl) {
  throw new Error('DB_FILE_NAME environment variable is required');
}

export const db = createDatabase(databaseUrl);

const resetDatabase = async () => {
  await db.delete(postsTable).execute();
  await db.delete(usersTable).execute();
};

const main = async () => {
  try {
    console.log('🌱 --- Démarrage du Seeding ---');

    await resetDatabase();

    await seedUsers(10);
    await seedPosts(5);

    console.log('✅ --- Seeding Terminé ---');
    process.exit(0);
  } catch (e) {
    console.error('❌ Erreur durant le seeding:', e);
    process.exit(1);
  }
};

main();
