import type { DIContainer } from "@/infrastructure/di/container";
import { GetPostsUseCase } from "@/application/posts/use-cases/get-posts.use-case";
import { GetPostUseCase } from "@/application/posts/use-cases/get-post.use-case";
import { CreatePostUseCase } from "@/application/posts/use-cases/create-post.use-case";
import { DeletePostUseCase } from "@/application/posts/use-cases/delete-post.use-case";
import { UpdatePostUseCase } from "@/application/posts/use-cases/update-post.use-case";
import { GetPostsByUserUseCase } from "@/application/posts/use-cases/get-posts-by-user.use-case";
import { DrizzlePostsRepository } from "@/infrastructure/persistence/posts/repositories/drizzle-posts.repository";

export function registerPostsModule(diContainer: DIContainer) {
  // Repositories
  diContainer.register('PostsRepository', (c) => {
    return new DrizzlePostsRepository(
      c.get('DrizzleConnection')
    )
  });

  // Use cases
  diContainer.register('GetPostsUseCase', (c) => {
    return new GetPostsUseCase(
      c.get('PostsRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('GetPostUseCase', (c) => {
    return new GetPostUseCase(
      c.get('PostsRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('CreatePostUseCase', (c) => {
    return new CreatePostUseCase(
      c.get('PostsRepository'),
      c.get('UsersRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('DeletePostUseCase', (c) => {
    return new DeletePostUseCase(
      c.get('PostsRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('UpdatePostUseCase', (c) => {
    return new UpdatePostUseCase(
      c.get('PostsRepository'),
      c.get('LoggerService')
    );
  });

  diContainer.register('GetPostsByUserUseCase', (c) => {
    return new GetPostsByUserUseCase(
      c.get('PostsRepository'),
      c.get('UsersRepository'),
      c.get('LoggerService')
    );
  });
}