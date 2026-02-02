import type { PostsRepository } from '@/domain/posts/repositories/posts.repository';
import type { LoggerService } from '@/application/common/interfaces/logger.service';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';
import { UserNotFoundException } from '@/domain/users/exceptions/user-not-found.exception';

export class GetPostsByUserUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }
    const posts = await this.postsRepository.findByUserId(userId);
    this.loggerService.log(`Found ${posts.length} posts for user ${user.id}`);
    return posts;
  }
}
