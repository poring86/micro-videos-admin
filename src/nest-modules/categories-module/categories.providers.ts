import { CreateCategoryUseCase } from "@core/category/application/use-cases/create-category/create-category.usecase";
import { DeleteCategoryUseCase } from "@core/category/application/use-cases/delete-category/delete-category.usecase";
import { GetCategoryUseCase } from "@core/category/application/use-cases/get-category/get-category.usecase";
import { ListCategoriesUseCase } from "@core/category/application/use-cases/list-category/list-category.usecase";
import { UpdateCategoryUseCase } from "@core/category/application/use-cases/update-category/update-category.usecase";
import { ICategoryRepository } from "@core/category/domain/category.repository";
import { CategoryInMemoryRepository } from "@core/category/infra/db/in-memory/category-in-memory.repository";
import { CategorySequelizeRepository } from "@core/category/infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "@core/category/infra/db/sequelize/category.model";
import { getModelToken } from "@nestjs/sequelize";


export const REPOSITORIES = {
  CATEGORY_REPOSITORY: {
    provide: 'CategoryRepository',
    useExisting: CategorySequelizeRepository,
  },
  CATEGORY_IN_MEMORY_REPOSITORY: {
    provide: CategoryInMemoryRepository,
    useClass: CategoryInMemoryRepository,
  },
  CATEGORY_SEQUELIZE_REPOSITORY: {
    provide: CategorySequelizeRepository,
    useFactory: (categoryModel: typeof CategoryModel) => {
      return new CategorySequelizeRepository(categoryModel);
    },
    inject: [getModelToken(CategoryModel)],
  },
};

export const USE_CASES = {
  CREATE_CATEGORY_USE_CASE: {
    provide: CreateCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new CreateCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  UPDATE_CATEGORY_USE_CASE: {
    provide: UpdateCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new UpdateCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  LIST_CATEGORIES_USE_CASE: {
    provide: ListCategoriesUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new ListCategoriesUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  GET_CATEGORY_USE_CASE: {
    provide: GetCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new GetCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  DELETE_CATEGORY_USE_CASE: {
    provide: DeleteCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new DeleteCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
};

export const CATEGORY_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
