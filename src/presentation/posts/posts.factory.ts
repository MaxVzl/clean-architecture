import { GetPostsController } from "@/presentation/posts/controllers/get-posts.controller"
import { GetPostsUseCase } from "@/application/posts/use-cases/get-posts.use-case"
import { MockPostsRepository } from "@/infrastructure/persistence/posts/repositories/mock-posts.repository"
import { loggerService } from "@/presentation/common/infrastructure.factory";

const postsRepository = new MockPostsRepository();

const getPostsUseCase = new GetPostsUseCase(
  postsRepository,
  loggerService
);

export const getPostsController = new GetPostsController(getPostsUseCase);