import { drizzle } from "drizzle-orm/libsql";

export class DrizzleService {
  private readonly _db: ReturnType<typeof drizzle>;

  constructor(connectionString: string) {
    this._db = drizzle(connectionString)
  }

  get db() { return this._db; }
}