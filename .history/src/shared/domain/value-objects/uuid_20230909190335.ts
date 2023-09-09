import { ValueObject } from "../value-object";
import { v4 as uuidv4 } from "uuid"
import crypto from "crypto"

export class Uuid extends ValueObject {
  readonly id: string
  constructor(id?: string) {
    super()
    this.id = id || uuidv4()
  }

  private validate() {
    const isValid = uuidValidate(this.id)
    if (!isValid) {
      throw new Error("Invalid uuid")
    }
  }
}