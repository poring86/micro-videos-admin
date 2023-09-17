import { Sequelize } from "sequelize-typescript"
import { CategoryModel } from "../category.model"
import { CategorySequelizeRepository } from "../category-sequelize.repository"
import { Category } from "../../../../domain/category.entity"
import { Uuid } from "../../../../../shared/domain/value-objects/uuid.vo"
import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error"

describe("CategorySequelizeRepository integration test", () => {
  let sequelize
  let repository: CategorySequelizeRepository
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel],
      logging: false
    })
    await sequelize.sync({ force: true })
    repository = new CategorySequelizeRepository(CategoryModel)
  })

  it("should inserts a new entity", async () => {
    let category = Category.fake().aCategory().build();
    await repository.insert(category);
    let entity = await repository.findById(category.category_id);
    expect(entity.toJSON()).toStrictEqual(category.toJSON());
  });

  it("should finds a entity by id", async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    const entity = Category.fake().aCategory().build();
    await repository.insert(entity);
    entityFound = await repository.findById(entity.category_id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should finds a entity by id", async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    const entity = Category.fake().aCategory().build();
    await repository.insert(entity);
    entityFound = await repository.findById(entity.category_id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should return all categories", async () => {
    const entity = Category.fake().aCategory().build();
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it("should throw error on update when a entity not found", async () => {
    const entity = Category.fake().aCategory().build();
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.category_id.id, Category)
    );
  });

})