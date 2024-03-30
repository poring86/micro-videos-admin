import request from 'supertest';
import { startApp } from 'src/nest-modules/shared-module/testing/helpers';
import { IGenreRepository } from '@core/genre/domain/genre.repository';
import { GENRES_PROVIDERS } from 'src/nest-modules/genres-module/genres.providers';
import { Genre } from '@core/genre/domain/genre.aggregate';
import { Category } from '@core/category/domain/category.aggregate';
import { ICategoryRepository } from '@core/category/domain/category.repository';
import { CATEGORY_PROVIDERS } from 'src/nest-modules/categories-module/categories.providers';

describe('GenresController (e2e)', () => {
  describe('/delete/:id (DELETE)', () => {
    const nestApp = startApp();
    describe('should a response error when id is invalid or not found', () => {
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          expected: {
            message:
              'Genre Not Found using ID 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
            statusCode: 404,
            error: 'Not Found',
          },
        },
        {
          id: 'fake id',
          expected: {
            statusCode: 422,
            message: 'Validation failed (uuid is expected)',
            error: 'Unprocessable Entity',
          },
        },
      ];

      test.each(arrange)('when id is $id', async ({ id, expected }) => {
        return request(nestApp.app.getHttpServer())
          .delete(`/genres/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it('should delete a category response with status 204', async () => {
      const genreRepo = nestApp.app.get<IGenreRepository>(
        GENRES_PROVIDERS.REPOSITORIES.GENRE_REPOSITORY.provide,
      );
      const categoryRepo = nestApp.app.get<ICategoryRepository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      const category = Category.fake().aCategory().build();
      await categoryRepo.insert(category);
      const genre = Genre.fake()
        .aGenre()
        .addCategoryId(category.category_id)
        .build();
      await genreRepo.insert(genre);

      await request(nestApp.app.getHttpServer())
        .delete(`/genres/${genre.genre_id.id}`)
        .expect(204);

      await expect(genreRepo.findById(genre.genre_id)).resolves.toBeNull();
    });
  });
});
