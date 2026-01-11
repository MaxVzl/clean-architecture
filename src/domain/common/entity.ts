import { UUID } from "@/domain/common/value-objects/uuid.vo"

export abstract class Entity {
  constructor(
    public readonly id: UUID,
    public readonly createdAt: Date,
    private _updatedAt: Date
  ) {}

  get updatedAt() { return this._updatedAt }

  protected touch(): void {
    this._updatedAt = new Date()
  }

  public equals(other: Entity): boolean {
    if (other === null || other === undefined) return false
    if (this === other) return true
    if (!(other instanceof Entity)) return false
    return this.id.equals(other.id)
  }
}