import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity"
import { drizzle } from "drizzle-orm/libsql"
import { seed } from "drizzle-seed"
import dotenv from "dotenv"
import { postsTable } from "@/infrastructure/persistence/posts/entities/post.entity"

dotenv.config()

async function main() {
  const db = drizzle(process.env.DB_FILE_NAME!)
  await seed(db, { usersTable, postsTable })
}

main()