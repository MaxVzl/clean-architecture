import type { AuthService } from "@/application/common/interfaces/auth.service";
import type { LoggerService } from "@/application/common/interfaces/logger.service";
import type { GetUsersUseCase } from "@/application/users/use-cases/get-users.use-case";
import type { GetUserUseCase } from "@/application/users/use-cases/get-user.use-case";
import type { CreateUserUseCase } from "@/application/users/use-cases/create-user.use-case";
import type { UsersRepository } from "@/domain/users/repositories/users.repository";
import type { DrizzleConnection } from "@/infrastructure/database";
import type { DeleteUserUseCase } from "@/application/users/use-cases/delete-user.use-case";
import type { UpdateUserUseCase } from "@/application/users/use-cases/update-user.use-case";
import type { PostsRepository } from "@/domain/posts/repositories/posts.repository";
import type { GetPostsUseCase } from "@/application/posts/use-cases/get-posts.use-case";
import type { GetPostUseCase } from "@/application/posts/use-cases/get-post.use-case";
import type { CreatePostUseCase } from "@/application/posts/use-cases/create-post.use-case";
import type { DeletePostUseCase } from "@/application/posts/use-cases/delete-post.use-case";
import type { UpdatePostUseCase } from "@/application/posts/use-cases/update-post.use-case";
import type { GetPostsByUserUseCase } from "@/application/posts/use-cases/get-posts-by-user.use-case";

export interface DIContainerTypes {
  DrizzleConnection: DrizzleConnection;

  // Services
  LoggerService: LoggerService;
  AuthService: AuthService;

  // Repositories
  UsersRepository: UsersRepository;
  PostsRepository: PostsRepository;

  // Use cases
  GetUsersUseCase: GetUsersUseCase;
  GetUserUseCase: GetUserUseCase;
  CreateUserUseCase: CreateUserUseCase;
  DeleteUserUseCase: DeleteUserUseCase;
  UpdateUserUseCase: UpdateUserUseCase;
  
  GetPostsUseCase: GetPostsUseCase;
  GetPostUseCase: GetPostUseCase;
  CreatePostUseCase: CreatePostUseCase;
  DeletePostUseCase: DeletePostUseCase;
  UpdatePostUseCase: UpdatePostUseCase;
  GetPostsByUserUseCase: GetPostsByUserUseCase;
}

export class DIContainer {
  private readonly factories: Record<string, (c: DIContainer) => any> = {};
  private readonly instances: Record<string, any> = {};
  
  register<K extends keyof DIContainerTypes>(
    key: K, 
    factory: (c: DIContainer) => DIContainerTypes[K]
  ) {
    this.factories[key] = factory;
  }
  
  get<K extends keyof DIContainerTypes>(key: K): DIContainerTypes[K] {
    if (this.instances[key]) {
      return this.instances[key];
    }
    const factory = this.factories[key];
    if (!factory) {
      throw new Error(`Aucun provider trouvé pour : ${key}`);
    }
    const instance = factory(this);
    this.instances[key] = instance;
    return instance;
  }

  override<K extends keyof DIContainerTypes>(key: K, instance: DIContainerTypes[K]) {
    this.instances[key] = instance;
    delete this.factories[key]; 
  }
}