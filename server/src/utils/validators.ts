import validator from "validator"

export const isEmail = (value: string): boolean => {
  return validator.isEmail(value)
}

export const isStrongPassword = (value: string): boolean => {
  return validator.isStrongPassword(value, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  })
}

export const isURL = (value: string): boolean => {
  return validator.isURL(value)
}

export const isPhoneNumber = (value: string): boolean => {
  return validator.matches(
    String(`+213${value}`),
    /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
  )
}
