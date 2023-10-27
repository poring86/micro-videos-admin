import { Category } from "@core/category/domain/category.aggregate";
import { ICategoryRepository } from "@core/category/domain/category.repository";
import * as CategoryProviders from 'src/nest-modules/categories-module/categories.providers';
import { startApp } from "src/nest-modules/shared-module/testing/helpers";
import request from 'supertest';
import { GetCategoryFixture } from "src/nest-modules/categories-module/testing/category-fixture";
import { CategoriesController } from "src/nest-modules/categories-module/categories.controller";
import { CategoryOutputMapper } from "@core/category/application/use-cases/common/category-output";
import { instanceToPlain } from "class-transformer";

describe('CategoriesController get (e2e)', () => {
  describe('/categories/:id (GET)', () => {
    const appHelper = startApp();
    describe('should send a response error when id is invalid or not found', () => {
      const arrange = [
        {
          id: '88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
          expected: {
            message:
              'Category Not Found using ID 88ff2587-ce5a-4769-a8c6-1d63d29c5f7a',
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
        return request(appHelper.app.getHttpServer())
          .get(`/categories/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });

    })

    it('should return a category', async () => {
      const categoryRepo = appHelper.app.get<ICategoryRepository>(
        CategoryProviders.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      const category = Category.fake().aCategory().build();
      await categoryRepo.insert(category);

      const res = await request(appHelper.app.getHttpServer())
        .get(`/categories/${category.category_id.id}`)
        .expect(200);

      const keysInResponse = GetCategoryFixture.keysInResponse;
      expect(Object.keys(res.body)).toStrictEqual(['data']);
      expect(Object.keys(res.body.data)).toStrictEqual(keysInResponse);

      const presenter = CategoriesController.serialize(
        CategoryOutputMapper.toOutput(category),
      );
      const serialized = instanceToPlain(presenter);
      expect(res.body.data).toStrictEqual(serialized);

    });
  })
})