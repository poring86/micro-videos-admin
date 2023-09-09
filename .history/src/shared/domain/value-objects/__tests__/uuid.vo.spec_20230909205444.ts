import { InvalidUuidError, Uuid } from "../value-objects/uuid"

describe("Uuid Unit tests", () => {
  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid("invalid-uuid")
    }).toThrowError(new InvalidUuidError())
  })
})