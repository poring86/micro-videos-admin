import { InvalidUuidError, Uuid } from "../uuid"

describe("Uuid Unit tests", () => {
  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid("invalid-uuid")
    }).toThrowError(new InvalidUuidError())
  })

  test('should accept a valid uuid', () => {
    expect(uuid.id).toBe('e58ebd88-4f56-11ee-be56-0242ac120002')
  })
})