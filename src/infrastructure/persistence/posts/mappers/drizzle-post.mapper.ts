import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { Post } from '@/domain/posts/entities/post.entity';
import type { DrizzlePost } from '@/infrastructure/database/schemas/drizzle-post.schema';

export class DrizzlePostMapper {
  static toDomain(post: DrizzlePost): Post {
    return Post.restore(UUID.create(post.id), {
      title: post.title,
      content: post.content,
      userId: UUID.create(post.userId),
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    });
  }

  static toPersistence(post: Post): DrizzlePost {
    return {
      id: post.id.props.value,
      title: post.props.title,
      content: post.props.content,
      userId: post.props.userId.props.value,
      createdAt: post.props.createdAt.toISOString(),
      updatedAt: post.props.updatedAt.toISOString(),
    };
  }
}
