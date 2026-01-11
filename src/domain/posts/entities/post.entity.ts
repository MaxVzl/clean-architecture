import { UUID } from "@/domain/common/value-objects/uuid.vo"

export class Post {
  private constructor(
    public readonly id: UUID,
    private _title: string,
    private _content: string,
    public readonly userId: UUID,
    public readonly createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get title() { return this._title }
  get content() { return this._content }
  get updatedAt() { return this._updatedAt }

  static create(title: string, content: string, userId: UUID): Post {
    return new Post(
      UUID.generate(),
      title,
      content,
      userId,
      new Date(),
      new Date()
    )
  }

  static restore(
    id: UUID,
    title: string,
    content: string,
    userId: UUID,
    createdAt: Date,
    updatedAt: Date
  ): Post {
    return new Post(id, title, content, userId, createdAt, updatedAt)
  }

  public update(title: string, content: string): void {
    this._title = title
    this._content = content
    this._updatedAt = new Date()
  }
}