import { InvalidUuidError, Uuid } from "../uuid"

describe("Uuid Unit tests", () => {
  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid("invalid-uuid")
    }).toThrowError(new InvalidUuidError())
  })

  test('should accept a valid uuid', () => {
    const uuid = new Uuid('e58ebd88-4f56-11ee-be56-0242ac120002')
    expect(uuid.id).toBe('e58ebd88-4f56-11ee-be56-0242ac120002')
  })
})