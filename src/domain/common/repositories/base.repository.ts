import type { UUID } from '@/domain/common/value-objects/uuid.vo';

export interface BaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: UUID): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: UUID): Promise<void>;
}
