import { usersTable } from '@/infrastructure/database/schemas/drizzle-user.schema';
import { seed } from 'drizzle-seed';
import { postsTable } from '@/infrastructure/database/schemas/drizzle-post.schema';
import { createDatabase } from '@/infrastructure/database';

async function main() {
  const databaseUrl = process.env.DB_FILE_NAME;
  if (!databaseUrl) {
    throw new Error('DB_FILE_NAME environment variable is required');
  }

  const db = createDatabase(databaseUrl);

  await seed(db, { usersTable, postsTable }).refine((funcs) => ({
    usersTable: {
      columns: {
        id: funcs.uuid(),
        createdAt: funcs.date(),
        updatedAt: funcs.date(),
      },
    },
    postsTable: {
      columns: {
        id: funcs.uuid(),
        createdAt: funcs.date(),
        updatedAt: funcs.date(),
      },
    },
  }));
}

main();
