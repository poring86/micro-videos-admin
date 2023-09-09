import { InvalidUuidError, Uuid } from "../uuid"
import { v4 as uuidv4, validate as uuidValidate } from "uuid"

describe("Uuid Unit tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validade')

  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid("invalid-uuid")
    }).toThrowError(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should accept a valid uuid', () => {
    const uuid = new Uuid()
    expect(uuid.id).toBeDefined()
    expect(uuidValidate(uuid.id)).toBe(true)
  })

  test('should accept a valid uuid', () => {
    const uuid = new Uuid('e58ebd88-4f56-11ee-be56-0242ac120002')
    expect(uuid.id).toBe('e58ebd88-4f56-11ee-be56-0242ac120002')
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})