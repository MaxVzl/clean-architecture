import { GetPostsController } from "@/presentation/posts/controllers/get-posts.controller"
import { GetPostsUseCase } from "@/application/posts/use-cases/get-posts.use-case"
import { loggerService, postsRepository, usersRepository } from "@/presentation/common/infrastructure.factory";
import { GetPostUseCase } from "@/application/posts/use-cases/get-post.use-case";
import { GetPostController } from "@/presentation/posts/controllers/get-post.controller";
import { GetPostsByUserUseCase } from "@/application/posts/use-cases/get-posts-by-user.use-case";
import { GetPostsByUserController } from "@/presentation/posts/controllers/get-posts-by-user.controller";
import { CreatePostUseCase } from "@/application/posts/use-cases/create-post.use-case";
import { CreatePostController } from "@/presentation/posts/controllers/create-post.controller";
import { UpdatePostUseCase } from "@/application/posts/use-cases/update-post.use-case";
import { UpdatePostController } from "@/presentation/posts/controllers/update-post.controller";
import { DeletePostUseCase } from "@/application/posts/use-cases/delete-post.use-case";
import { DeletePostController } from "@/presentation/posts/controllers/delete-post.controller";

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

const createPostUseCase = new CreatePostUseCase(
  postsRepository,
  usersRepository,
  loggerService
);

export const createPostController = new CreatePostController(createPostUseCase);

const updatePostUseCase = new UpdatePostUseCase(
  postsRepository,
  loggerService
);

export const updatePostController = new UpdatePostController(updatePostUseCase);

const deletePostUseCase = new DeletePostUseCase(
  postsRepository,
  loggerService
);

export const deletePostController = new DeletePostController(deletePostUseCase);