import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity"
import { seed } from "drizzle-seed"
import { postsTable } from "@/infrastructure/persistence/posts/entities/drizzle-post.entity"
import { DrizzleService } from "@/infrastructure/services/drizzle.service"
import 'dotenv/config'

async function main() {
  await seed(new DrizzleService(process.env.DB_FILE_NAME!).db, { usersTable, postsTable }).refine((funcs) => ({
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