import { Post } from "@/domain/posts/entities/post.entity";
import type { PostsRepository } from "@/domain/posts/repositories/posts.repository";
import { postsTable } from "@/infrastructure/persistence/posts/entities/drizzle-post.entity";
import { eq } from "drizzle-orm";
import { DrizzlePostMapper } from "@/infrastructure/persistence/posts/mappers/drizzle-post.mapper";
import type { DrizzleService } from "@/infrastructure/services/drizzle.service";

export class DrizzlePostsRepository implements PostsRepository {
  constructor(
    private readonly drizzleService: DrizzleService
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.drizzleService.db.select().from(postsTable)
    return posts.map((post) => DrizzlePostMapper.toDomain(post))
  }

  async findById(id: string): Promise<Post | null> {
    const post = await this.drizzleService.db.select().from(postsTable).where(eq(postsTable.id, id))
    
    if (post.length === 0) {
      return null
    }

    return DrizzlePostMapper.toDomain(post[0])
  }

  async findByUserId(userId: string): Promise<Post[]> {
    const posts = await this.drizzleService.db.select().from(postsTable).where(eq(postsTable.userId, userId))
    return posts.map((post) => DrizzlePostMapper.toDomain(post))
  }

  async create(post: Post): Promise<Post> {
    const postEntity = DrizzlePostMapper.toPersistence(post)
    const [createdPost] = await this.drizzleService.db.insert(postsTable).values(postEntity).returning()
    return DrizzlePostMapper.toDomain(createdPost)
  }

  async update(post: Post): Promise<Post> {
    const postEntity = DrizzlePostMapper.toPersistence(post)
    const [updatedUser] = await this.drizzleService.db.update(postsTable).set(postEntity).where(eq(postsTable.id, post.id.value)).returning()
    return DrizzlePostMapper.toDomain(updatedUser)
  }

  async delete(id: string): Promise<void> {
    await this.drizzleService.db.delete(postsTable).where(eq(postsTable.id, id))
  }
}