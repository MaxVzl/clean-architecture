import type { LoggerService } from '@/application/common/interfaces/logger.service';
import type { CreatePostDto } from '@/application/posts/dto/create-post.dto';
import { Post } from '@/domain/posts/entities/post.entity';
import type { PostsRepository } from '@/domain/posts/repositories/posts.repository';
import type { UsersRepository } from '@/domain/users/repositories/users.repository';
import { UserNotFoundException } from '@/domain/users/exceptions/user-not-found.exception';
import { UUID } from '@/domain/common/value-objects/uuid.vo';

export class CreatePostUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(createPostDto: CreatePostDto) {
    const user = await this.usersRepository.findById(
      UUID.create(createPostDto.userId),
    );
    if (!user) {
      throw new UserNotFoundException(createPostDto.userId);
    }
    const post = Post.create({
      title: createPostDto.title,
      content: createPostDto.content,
      userId: user.id.props.value,
    });
    const createdPost = await this.postsRepository.create(post);
    this.loggerService.log(`Created post ${createdPost.id.props.value}`);
    return createdPost;
  }
}
