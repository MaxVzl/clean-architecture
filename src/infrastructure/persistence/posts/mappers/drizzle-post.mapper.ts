import { UUID } from "@/domain/common/value-objects/uuid.vo";
import { Post } from "@/domain/posts/entities/post.entity";
import type { DrizzlePost } from "@/infrastructure/persistence/posts/entities/drizzle-post.entity";

export class DrizzlePostMapper {
  static toDomain(post: DrizzlePost): Post {
    return Post.restore(
      new UUID(post.id),
      post.title,
      post.content,
      new UUID(post.userId),
      new Date(post.createdAt),
      new Date(post.updatedAt)
    )
  }

  static toPersistence(post: Post): DrizzlePost {
    return {
      id: post.id.value,
      title: post.title,
      content: post.content,
      userId: post.userId.value,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    }
  }
}