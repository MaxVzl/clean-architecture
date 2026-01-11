import { GetPostsController } from "@/presentation/posts/controllers/get-posts.controller"
import { GetPostsUseCase } from "@/application/posts/use-cases/get-posts.use-case"
import { MockPostsRepository } from "@/infrastructure/persistence/posts/repositories/mock-posts.repository"
import { loggerService } from "@/presentation/common/infrastructure.factory";
import { DrizzlePostsRepository } from "@/infrastructure/persistence/posts/repositories/drizzle-posts.repository";
import { GetPostUseCase } from "@/application/posts/use-cases/get-post.use-case";
import { GetPostController } from "@/presentation/posts/controllers/get-post.controller";
import { GetPostsByUserUseCase } from "@/application/posts/use-cases/get-posts-by-user.use-case";
import { GetPostsByUserController } from "@/presentation/posts/controllers/get-posts-by-user.controller";
import { DrizzleUsersRepository } from "@/infrastructure/persistence/users/repositories/drizzle-users.repository";

// const postsRepository = new MockPostsRepository();
const postsRepository = new DrizzlePostsRepository();
const usersRepository = new DrizzleUsersRepository();

const getPostsUseCase = new GetPostsUseCase(
  postsRepository,
  loggerService
);

export const getPostsController = new GetPostsController(getPostsUseCase);

const getPostUseCase = new GetPostUseCase(
  postsRepository,
  loggerService
);

export const getPostController = new GetPostController(getPostUseCase);

const getPostsByUserUseCase = new GetPostsByUserUseCase(
  postsRepository,
  usersRepository,
  loggerService
);

export const getPostsByUserController = new GetPostsByUserController(getPostsByUserUseCase);