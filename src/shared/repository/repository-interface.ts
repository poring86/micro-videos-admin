import { Entity } from "../domain/entity";

export interface IRepository<E extends Entity, EntityId> {
  insert(entity: E): Promise<void>
  bulkInsert(entity: E): Promise<void>
  update(entity: E): Promise<void>
  delete(entity_id: EntityId): Promise<void>
  findById(entity_id: EntityId): Promise<E | null>
  findAll(): Promise<E[]>
  getEntity(): new (...args: any[]) => E
}