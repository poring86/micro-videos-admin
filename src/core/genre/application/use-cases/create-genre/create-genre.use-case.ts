import { IUseCase } from '@core/shared/application/use-case.interface';
import { IUnitOfWork } from '@core/shared/domain/repository/unit-of-work.interface';
import { CreateGenreInput } from './create-genre.input';
import { IGenreRepository } from '@core/genre/domain/genre.repository';
import { ICategoryRepository } from '@core/category/domain/category.repository';

import { Genre } from '@core/genre/domain/genre.aggregate';
import { EntityValidationError } from '@core/shared/domain/validators/validation.error';
import { GenreOutput, GenreOutputMapper } from '../common/genre-output';
import { CategoriesIdExistsInDatabaseValidator } from '@core/category/application/validations/categories-ids-exists-in-database.validator';

export class CreateGenreUseCase
  implements IUseCase<CreateGenreInput, CreateGenreOutput>
{
  constructor(
    private uow: IUnitOfWork,
    private genreRepo: IGenreRepository,
    private categoryRepo: ICategoryRepository,
    private categoriesIdExistsInStorage: CategoriesIdExistsInDatabaseValidator,
  ) {}

  async execute(input: CreateGenreInput): Promise<CreateGenreOutput> {
    const [categoriesId, errorsCategoriesIds] = (
      await this.categoriesIdExistsInStorage.validate(input.categories_id)
    ).asArray();

    console.log('input.categories_id', input.categories_id);
    console.log('errorsCategoriesIds', errorsCategoriesIds);
    console.log('categoriesId', categoriesId);

    const { name, is_active } = input;

    const entity = Genre.create({
      name,
      categories_id: errorsCategoriesIds ? [] : categoriesId,
      is_active,
    });

    const notification = entity.notification;

    if (errorsCategoriesIds) {
      notification.setError(
        errorsCategoriesIds.map((e) => e.message),
        'categories_id',
      );
    }

    if (notification.hasErrors()) {
      throw new EntityValidationError(notification.toJSON());
    }

    await this.uow.do(async () => {
      return this.genreRepo.insert(entity);
    });

    const categories = await this.categoryRepo.findByIds(
      Array.from(entity.categories_id.values()),
    );

    return GenreOutputMapper.toOutput(entity, categories);
  }
}

export type CreateGenreOutput = GenreOutput;
