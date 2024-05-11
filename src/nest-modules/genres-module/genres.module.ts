import {
  GenreCategoryModel,
  GenreModel,
} from '@core/genre/infra/db/sequelize/genre.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from '../categories-module/categories.module';
import { GENRES_PROVIDERS } from './genres.providers';
import { GenresController } from './genres.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([GenreModel, GenreCategoryModel]),
    CategoriesModule,
  ],
  controllers: [GenresController],
  providers: [
    ...Object.values(GENRES_PROVIDERS.REPOSITORIES),
    ...Object.values(GENRES_PROVIDERS.USE_CASES),
    ...Object.values(GENRES_PROVIDERS.VALIDATIONS),
  ],
  exports: [GENRES_PROVIDERS.REPOSITORIES.GENRE_REPOSITORY.provide],
})
export class GenresModule {}
