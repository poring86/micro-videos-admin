import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesController } from "../categories.controller";
import { DatabaseModule } from "../../database-module/database.module";
import { ConfigModule } from '../../config-module/config.module';
import { CATEGORY_PROVIDERS } from "../category.providers";
import { ICategoryRepository } from "@core/category/domain/category.repository";
import { CategoriesModule } from "../categories.module";
import { CreateCategoryUseCase } from "@core/category/application/use-cases/create-category/create-category.usecase";
import { UpdateCategoryUseCase } from "@core/category/application/use-cases/update-category/update-category.usecase";
import { ListCategoriesUseCase } from "@core/category/application/use-cases/list-category/list-category.usecase";
import { GetCategoryUseCase } from "@core/category/application/use-cases/get-category/get-category.usecase";
import { DeleteCategoryUseCase } from "@core/category/application/use-cases/delete-category/delete-category.usecase";

describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController;
  let repository: ICategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();
    controller = module.get<CategoriesController>(CategoriesController);
    repository = module.get<ICategoryRepository>(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller['createUseCase']).toBeInstanceOf(CreateCategoryUseCase);
    expect(controller['updateUseCase']).toBeInstanceOf(UpdateCategoryUseCase);
    expect(controller['listUseCase']).toBeInstanceOf(ListCategoriesUseCase);
    expect(controller['getUseCase']).toBeInstanceOf(GetCategoryUseCase);
    expect(controller['deleteUseCase']).toBeInstanceOf(DeleteCategoryUseCase);
  });

  it('should create a category', () => { });

  it('should update a category', () => { });
});
//agente viu este tipo de teste no curso
//end to end