import { Entity } from '@/domain/common/entity';
import { UUID } from '@/domain/common/value-objects/uuid.vo';
import z from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  userId: z.string(),
});

export type CreatePostDTO = z.infer<typeof createPostSchema>;

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

  static create(props: CreatePostDTO, id?: UUID): Post {
    const result = createPostSchema.safeParse(props);

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(', ');
      throw new Error(`Validation Post échouée : ${errorMessage}`);
    }

    const data = result.data;

    const userIdVO = UUID.create(data.userId);

    return new Post(
      {
        title: data.title,
        content: data.content,
        userId: userIdVO,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );
  }

  static restore(id: UUID, props: PostProps): Post {
    return new Post(props, id);
  }

  public update(title: string, content: string): void {
    this.props = { ...this.props, title, content, updatedAt: new Date() };
  }
}
