import type { BaseRepository } from "@/domain/common/repositories/base.repository";
import { Post } from "@/domain/posts/entities/post.entity";

export interface PostsRepository extends BaseRepository<Post> {}