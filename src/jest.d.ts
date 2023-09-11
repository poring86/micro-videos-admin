import { FieldsErrors } from "./shared/domain/validators/validator-fields-interface";

declare global {
  namespace jest {
    interface Machers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R
    }
  }
}