import type { LoggerService } from '@/application/common/interfaces/logger.service';
import type { UpdatePostDto } from '@/application/posts/dto/update-post.dto';
import { PostNotFoundException } from '@/domain/posts/exceptions/post-not-found.exception';
import type { PostsRepository } from '@/domain/posts/repositories/posts.repository';

export class UpdatePostUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(id: string, updatePostDto: UpdatePostDto) {
    const existingPost = await this.postsRepository.findById(id);
    if (!existingPost) {
      throw new PostNotFoundException(id);
    }
    existingPost.update(updatePostDto.title, updatePostDto.content);
    const updatedPost = await this.postsRepository.update(existingPost);
    this.loggerService.log(`Updated post ${updatedPost.id}`);
    return updatedPost;
  }
}
