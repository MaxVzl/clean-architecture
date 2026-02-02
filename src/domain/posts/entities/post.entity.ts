import { Entity } from '@/domain/common/entity';
import { UUID } from '@/domain/common/value-objects/uuid.vo';

export class Post extends Entity {
  private constructor(
    id: UUID,
    private _title: string,
    private _content: string,
    public readonly userId: UUID,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  get title() {
    return this._title;
  }
  get content() {
    return this._content;
  }

  static create(title: string, content: string, userId: UUID): Post {
    return new Post(
      UUID.generate(),
      title,
      content,
      userId,
      new Date(),
      new Date(),
    );
  }

  static restore(
    id: UUID,
    title: string,
    content: string,
    userId: UUID,
    createdAt: Date,
    updatedAt: Date,
  ): Post {
    return new Post(id, title, content, userId, createdAt, updatedAt);
  }

  public update(title: string, content: string): void {
    this._title = title;
    this._content = content;
    this.touch();
  }
}
