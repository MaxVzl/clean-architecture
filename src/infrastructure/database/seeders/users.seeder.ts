import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity"
import { seed } from "drizzle-seed"
import { postsTable } from "@/infrastructure/persistence/posts/entities/drizzle-post.entity"
import { createDatabase } from "@/infrastructure/database"

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
        updatedAt: funcs.date()
      }
    },
    postsTable: {
      columns: {
        id: funcs.uuid(),
        createdAt: funcs.date(),
        updatedAt: funcs.date()
      }
    }
  }))
}

main()