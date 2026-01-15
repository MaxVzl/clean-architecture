import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity"
import { seed } from "drizzle-seed"
import { postsTable } from "@/infrastructure/persistence/posts/entities/drizzle-post.entity"
import { db } from "@/infrastructure/database"

async function main() {
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