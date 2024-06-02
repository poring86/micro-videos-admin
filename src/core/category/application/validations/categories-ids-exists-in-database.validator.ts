import { Category, CategoryId } from '@core/category/domain/category.aggregate';
import { ICategoryRepository } from '@core/category/domain/category.repository';
import { Either } from '@core/shared/domain/either';
import { NotFoundError } from '@core/shared/domain/errors/not-found.error';

export class CategoriesIdExistsInDatabaseValidator {
  constructor(private categoryRepo: ICategoryRepository) {}

  async validate(
    categories_id: string[],
  ): Promise<Either<CategoryId[], NotFoundError[]>> {
    console.log('batataaaa');
    const categoriesId = categories_id.map((v) => new CategoryId(v));

    console.log('categoriesId aaaaaaaa', categoriesId);

    const existsResult = await this.categoryRepo.existsById(categoriesId);
    return existsResult.not_exists.length > 0
      ? Either.fail(
          existsResult.not_exists.map((c) => new NotFoundError(c.id, Category)),
        )
      : Either.ok(categoriesId);
  }
}
