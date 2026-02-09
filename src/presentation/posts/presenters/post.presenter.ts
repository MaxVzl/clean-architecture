import type { Post } from '@/domain/posts/entities/post.entity';
import type { PostSchema } from '@/presentation/posts/schemas/post.schema';

export class PostPresenter {
  static toResponse(post: Post): PostSchema {
    return {
      id: post.id.props.value,
      title: post.props.title,
      content: post.props.content,
      userId: post.props.userId.props.value,
      createdAt: post.props.createdAt,
      updatedAt: post.props.updatedAt,
    };
  }
}
