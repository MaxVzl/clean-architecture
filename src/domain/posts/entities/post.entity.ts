import { Entity } from '@/domain/common/entity';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  userId: z.string(),
});

export type CreatePostProps = z.infer<typeof createPostSchema>;

interface PostProps {
  title: string;
  content: string;
  userId: UUID;
  createdAt: Date;
  updatedAt: Date;
}

export class Post extends Entity<PostProps> {
  private constructor(props: PostProps, id?: UUID) {
    super(props, id);
  }

  static create(props: CreatePostProps, id?: UUID): Post {
    const data = this.validate(createPostSchema, props, 'Post');

    return new Post(
      {
        title: data.title,
        content: data.content,
        userId: UUID.create(data.userId),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );
  }

  static restore(id: UUID, props: PostProps): Post {
    return new Post(props, id);
  }

  public update(props: Partial<PostProps>): void {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    };
  }
}
