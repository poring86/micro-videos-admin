import { InvalidUuidError, Uuid } from "../uuid"

describe("Uuid Unit tests", () => {
  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uu id("invalid-uuid")
    }).toThrowError(new InvalidUuidError())
  })
})