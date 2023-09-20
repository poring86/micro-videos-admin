import { Category } from "../../../../domain/category.entity"
import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository"
import { DeleteCategoryUseCase } from "../../delete-category/delete-category.usecase"

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new DeleteCategoryUseCase(repository)
  })

  it("should throws error when entity not found", async () => {
    const items = [new Category({ name: "test 1" })]
    repository.items = items
    await useCase.execute({
      id: items[0].category_id.id
    })
  })

  it("should delete a category", async () => {
    const items = [new Category({ name: "test 1" })]
    repository.items = items
    await useCase.execute({
      id: items[0].category_id.id
    })
    expect(repository.items).toHaveLength(0)
  })
})