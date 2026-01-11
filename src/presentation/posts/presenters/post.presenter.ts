import type { Post } from "@/domain/posts/entities/post.entity";
import type { PostSchema } from "@/presentation/posts/schemas/post.schema";

export class PostPresenter {
  static toResponse(post: Post): PostSchema {
    return {
      id: post.id.value,
      title: post.title,
      content: post.content,
      userId: post.userId.value,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }
}