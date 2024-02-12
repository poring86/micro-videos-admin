import { IUseCase } from '@core/shared/application/use-case.interface';
import { UpdateGenreInput } from './update-genre.input';
import { CategoriesIdExistsInStorageValidator } from '@core/category/application/validations/categories-ids-exists-in-storage.validator';
import { ICategoryRepository } from '@core/category/domain/category.repository';
import { IGenreRepository } from '@core/genre/domain/genre.repository';
import { IUnitOfWork } from '@core/shared/domain/repository/unit-of-work.interface';
import { Genre, GenreId } from '@core/genre/domain/genre.aggregate';
import { NotFoundError } from '@core/shared/domain/errors/not-found.error';
import { EntityValidationError } from '@core/shared/domain/validators/validation.error';
import { GenreOutput, GenreOutputMapper } from '../common/genre-output';

export class UpdateGenreUseCase
  implements IUseCase<UpdateGenreInput, UpdateGenreOutput>
{
  constructor(
    private uow: IUnitOfWork,
    private genreRepo: IGenreRepository,
    private categoryRepo: ICategoryRepository,
    private categoriesIdExistsInStorageValidator: CategoriesIdExistsInStorageValidator,
  ) {}

  async execute(input: UpdateGenreInput): Promise<UpdateGenreOutput> {
    const genreId = new GenreId(input.id);
    const genre = await this.genreRepo.findById(genreId);

    if (!genre) {
      throw new NotFoundError(input.id, Genre);
    }

    input.name && genre.changeName(input.name);

    if (input.is_active === true) {
      genre.activate();
    }

    if (input.is_active === false) {
      genre.deactivate();
    }

    const notification = genre.notification;

    if (input.categories_id) {
      const [categoriesId, errorsCategoriesId] = (
        await this.categoriesIdExistsInStorageValidator.validate(
          input.categories_id,
        )
      ).asArray();

      categoriesId && genre.syncCategoriesId(categoriesId);

      errorsCategoriesId &&
        notification.setError(
          errorsCategoriesId.map((e) => e.message),
          'categories_id',
        );
    }

    if (genre.notification.hasErrors()) {
      throw new EntityValidationError(genre.notification.toJSON());
    }

    await this.uow.do(async () => {
      return this.genreRepo.update(genre);
    });

    const categories = await this.categoryRepo.findByIds(
      Array.from(genre.categories_id.values()),
    );

    return GenreOutputMapper.toOutput(genre, categories);
  }
}

export type UpdateGenreOutput = GenreOutput;
