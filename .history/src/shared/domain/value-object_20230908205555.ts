export class ValueObject {
  public equals(vo: this): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
  }
}