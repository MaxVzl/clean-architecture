import { usersTable } from "@/infrastructure/persistence/users/entities/drizzle-user.entity";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const postsTable = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").notNull().references(() => usersTable.id),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull()
})

export type DrizzlePost = typeof postsTable.$inferSelect;