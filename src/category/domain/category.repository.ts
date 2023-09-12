import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { IRepository } from "../../shared/domain/repository/repository-interface";
import { Category } from "./category.entity";

export interface ICategoryRepository extends IRepository<Category, Uuid> {


}
