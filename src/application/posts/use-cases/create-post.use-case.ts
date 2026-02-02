import type { LoggerService } from '@/application/common/interfaces/logger.service';
import type { CreatePostDto } from '@/application/posts/dto/create-post.dto';
import { Post } from '@/domain/posts/entities/post.entity';
import type { PostsRepository } from '@/domain/posts/repositories/posts.repository';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';
import { UserNotFoundException } from '@/domain/users/exceptions/user-not-found.exception';

export class CreatePostUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(createPostDto: CreatePostDto) {
    const user = await this.usersRepository.findById(createPostDto.userId);
    if (!user) {
      throw new UserNotFoundException(createPostDto.userId);
    }
    const post = Post.create(
      createPostDto.title,
      createPostDto.content,
      user.id,
    );
    const createdPost = await this.postsRepository.create(post);
    this.loggerService.log(`Created post ${createdPost.id}`);
    return createdPost;
  }
}
