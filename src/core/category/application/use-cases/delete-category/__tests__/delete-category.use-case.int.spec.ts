import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';

import { DeleteCategoryUseCase } from '../delete-category.use-case';
import { setupSequelize } from '@core/shared/infra/testing/helpers';
import { Category } from '@core/category/domain/category.aggregate';
import { CategorySequelizeRepository } from '@core/category/infra/db/sequelize/category-sequelize.repository';

describe('DeleteCategoryUseCase Integration Tests', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new DeleteCategoryUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);
    await useCase.execute({
      id: category.category_id.id,
    });
    await expect(repository.findById(category.category_id)).resolves.toBeNull();
  });
});
