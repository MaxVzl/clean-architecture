import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/infrastructure/persistence/**/*.entity.ts",
  out: "./src/infrastructure/database/migrations",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!
  }
})