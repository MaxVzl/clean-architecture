import type { CreatePostUseCase } from '@/application/posts/use-cases/create-post.use-case';
import type { DeletePostUseCase } from '@/application/posts/use-cases/delete-post.use-case';
import type { GetPostUseCase } from '@/application/posts/use-cases/get-post.use-case';
import type { GetPostsByUserUseCase } from '@/application/posts/use-cases/get-posts-by-user.use-case';
import type { GetPostsUseCase } from '@/application/posts/use-cases/get-posts.use-case';
import type { UpdatePostUseCase } from '@/application/posts/use-cases/update-post.use-case';
import type { PostsRepository } from '@/domain/posts/repositories/posts.repository';

export interface PostsTypes {
  // Repositories
  PostsRepository: PostsRepository;

  // Use cases
  GetPostsUseCase: GetPostsUseCase;
  GetPostUseCase: GetPostUseCase;
  CreatePostUseCase: CreatePostUseCase;
  DeletePostUseCase: DeletePostUseCase;
  UpdatePostUseCase: UpdatePostUseCase;
  GetPostsByUserUseCase: GetPostsByUserUseCase;
}
