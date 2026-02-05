import type { LoggerService } from '@/application/common/interfaces/logger.service';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { PostNotFoundException } from '@/domain/posts/exceptions/post-not-found.exception';
import type { PostsRepository } from '@/domain/posts/repositories/posts.repository';

export class GetPostUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(id: string) {
    const post = await this.postsRepository.findById(UUID.create(id));
    if (!post) {
      throw new PostNotFoundException(id);
    }
    this.loggerService.log(`Found post ${post.id.props.value}`);
    return post;
  }
}
