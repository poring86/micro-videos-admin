import { ListCategoriesInput } from "@core/category/application/use-cases/list-categories/list-categories.use-case";
import { CategoryFilter } from "@core/category/domain/category.repository";
import { SortDirection } from "@core/shared/domain/repository/search-params";

export class SearchCategoriesDto implements ListCategoriesInput {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
}