import { UUID } from "@/domain/common/value-objects/uuid.vo";

export abstract class Entity1<T> {
  protected readonly _id: UUID;
  public readonly props: T;

  constructor(props: T, id?: UUID) {
    this._id = id ?? UUID.generate();
    this.props = props;
  }

  get id() { return this._id }

  public equals(entity: Entity1<T>): boolean {
    if (entity === null || entity === undefined) return false
    if (this === entity) return true
    return this._id.equals(entity._id)
  }
}