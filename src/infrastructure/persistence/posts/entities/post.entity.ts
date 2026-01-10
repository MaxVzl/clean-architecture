import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const postsTable = sqliteTable("posts", {
  id: text().primaryKey(),
  title: text().notNull(),
  content: text().notNull(),
  userId: text().notNull().references(() => usersTable.id),
  createdAt: text().notNull(),
  updatedAt: text().notNull()
})