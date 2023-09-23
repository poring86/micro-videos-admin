import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";
import { CreateCategoryInput } from "./create-category-input";

export class CreateCategoryUseCase implements IUseCase<CreateCategoryInput, CreateCategoryOutput>{
  constructor(private readonly categoryRepo: ICategoryRepository) { }

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = Category.create(input)

    await this.categoryRepo.insert(entity)

    return CategoryOutputMapper.toOutput(entity)
  }
}


export type CreateCategoryOutput = CategoryOutput
