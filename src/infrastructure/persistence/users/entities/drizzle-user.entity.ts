import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: text().notNull(),
  updatedAt: text().notNull()
})

export type DrizzleUser = typeof usersTable.$inferSelect;