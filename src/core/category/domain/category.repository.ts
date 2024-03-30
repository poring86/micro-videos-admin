import { ISearchableRepository } from '../../shared/domain/repository/repository-interface';
import { Category, CategoryId } from './category.aggregate';
import { SearchResult } from '../../shared/domain/repository/search-result';
import { SearchParams } from '../../shared/domain/repository/search-params';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export interface ICategoryRepository
  extends ISearchableRepository<
    Category,
    CategoryId,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {}
