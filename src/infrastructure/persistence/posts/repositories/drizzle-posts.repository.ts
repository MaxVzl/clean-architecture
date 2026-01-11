import { Post } from "@/domain/posts/entities/post.entity";
import type { PostsRepository } from "@/domain/posts/repositories/posts.repository";
import { postsTable } from "@/infrastructure/persistence/posts/entities/post.entity";
import { drizzle } from "drizzle-orm/libsql";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { DrizzlePostMapper } from "@/infrastructure/persistence/posts/mappers/drizzle-post.mapper";

dotenv.config()

const db = drizzle(process.env.DB_FILE_NAME!);

export class DrizzlePostsRepository implements PostsRepository {
  async findAll(): Promise<Post[]> {
    const posts = await db.select().from(postsTable)
    return posts.map((post) => DrizzlePostMapper.toDomain(post))
  }

  async findById(id: string): Promise<Post | null> {
    const post = await db.select().from(postsTable).where(eq(postsTable.id, id))
    
    if (post.length === 0) {
      return null
    }

    return DrizzlePostMapper.toDomain(post[0])
  }

  async findByUserId(userId: string): Promise<Post[]> {
    const posts = await db.select().from(postsTable).where(eq(postsTable.userId, userId))
    return posts.map((post) => DrizzlePostMapper.toDomain(post))
  }

  async create(post: Post): Promise<Post> {
    const postEntity = DrizzlePostMapper.toPersistence(post)
    const [createdPost] = await db.insert(postsTable).values(postEntity).returning()
    return DrizzlePostMapper.toDomain(createdPost)
  }

  async update(post: Post): Promise<Post> {
    const postEntity = DrizzlePostMapper.toPersistence(post)
    const [updatedUser] = await db.update(postsTable).set(postEntity).where(eq(postsTable.id, post.id.value)).returning()
    return DrizzlePostMapper.toDomain(updatedUser)
  }

  async delete(id: string): Promise<void> {
    await db.delete(postsTable).where(eq(postsTable.id, id))
  }
}