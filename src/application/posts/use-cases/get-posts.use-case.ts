import type { PostsRepository } from '@/domain/posts/repositories/posts.repository';
import type { LoggerService } from '@/application/common/interfaces/logger.service';

export class GetPostsUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute() {
    const posts = await this.postsRepository.findAll();
    this.loggerService.log(`Found ${posts.length} posts`);
    return posts;
  }
}
