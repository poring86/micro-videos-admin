import { setupSequelize } from "../../../../../shared/infra/testing/herpers"
import { Category } from "../../../../domain/category.entity"
import { CategorySequelizeRepository } from "../../../../infra/db/sequelize/category-sequelize.repository"
import { CategoryModel } from "../../../../infra/db/sequelize/category.model"
import { DeleteCategoryUseCase } from "../delete-category.usecase"

describe("DeleteCategoryUseCase Integration Tests", () => {
  let useCase: DeleteCategoryUseCase
  let repository: CategorySequelizeRepository

  setupSequelize({ models: [CategoryModel] })

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel)
    useCase = new DeleteCategoryUseCase(repository)
  })

  it("should throws error when entity not found", async () => {
    const category = Category.fake().aCategory().build()
    await repository.insert(category)
    await useCase.execute({
      id: category.category_id.id
    })
    await expect(repository.findById(category.category_id)).resolves.toBeNull()
  })
})