import type { BaseRepository } from '@/domain/common/repositories/base.repository';
import type { UUID } from '@/domain/common/value-objects/uuid.vo';
import { Post } from '@/domain/posts/entities/post.entity';

export interface PostsRepository extends BaseRepository<Post> {
  findByUserId(userId: UUID): Promise<Post[]>;
}
