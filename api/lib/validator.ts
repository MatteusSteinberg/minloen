import * as EmailValidator from 'email-validator';
import _ from "lodash";


export type validators = "email" | "password" | "required" | "numberonly"

export interface ValidationObject {
  [path: string]: Array<validators>
}

export function validateObject(validationObject: ValidationObject, obj: any): { method: validators, path: string, value: any } | void {
  for (const [path, array] of Object.entries(validationObject)) {
    const validMethods = _.uniq(array)
    const value = _.get(obj, path)

    for (const method of validMethods) {
      const valid = validate(value, method)
      if (!valid) {
        return { method, path, value: value || null }
      }
    }
  }
}

function validate(value: any, validator: validators): boolean {
  switch (validator) {
    case "email": {
      if (typeof value !== "string") return false
      return EmailValidator.validate(value)
    }
    case "numberonly": {
      return _.isInteger(value * 1)
    }
    case "password": {
      // Letters, numbers and special symbols + length of 8 or higher
      if (typeof value !== "string") return false
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      return regex.test(value) && value.length >= 8
    }
    case "required": {
      if (typeof value === "string") {
        return !!value.trim()
      } else {
        return !!value
      }
    }
    default: {
      /** Should never reach */
      return true
    }
  }
}