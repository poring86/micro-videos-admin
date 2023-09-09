import { InvalidUuidError, Uuid } from "../uuid"

describe("Uuid Unit tests", () => {
  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid("invalid-uuid")
    }).toThrowError(new InvalidUuidError())
  })
})