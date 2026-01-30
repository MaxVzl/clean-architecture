import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/infrastructure/database/schemas/**/*.schema.ts",
  out: "./src/infrastructure/database/migrations",
  dbCredentials: {
    url: "./local.db"
  }
})