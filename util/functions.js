import { userInfoFormSubmit } from "./event-types"

export const submitEvent = event => {
  event.preventDefault()
  event.stopPropagation()
  if (process.browser) {
    document.dispatchEvent(new Event(userInfoFormSubmit))
  }
}

export const userProfileInputValid = state => {
  return (
    state.emailValid &&
    state.phoneValid &&
    state.passwordValid &&
    state.nameValid &&
    state.addressValid &&
    state.zipCodeValid
  )
}

export const splitAddress = address => {
  const addressSplit = address.split(" ")
  let zipCode = addressSplit[addressSplit.length - 1]
  try {
    zipCode = parseInt(zipCode)
  } catch (err) {
    throw new Error(`zip code is invalid: ${zipCode}`)
  }
  const stateAbbrev = addressSplit[addressSplit.length - 2]
  if (stateAbbrev.length !== 2) {
    throw new Error(`state code is invalid: ${stateAbbrev}`)
  }
  const city = addressSplit[addressSplit.length - 3]
  let street = ""
  addressSplit.forEach((token, i, arr) => {
    if (i < arr.length - 3) {
      street += `${token} `
    }
  })

  return {
    address: street,
    city: city,
    state: stateAbbrev,
    zipCode: zipCode
  }
}

export const validPassword = password => {
  const specialCharacters = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
  return password.length >= 8 && specialCharacters.test(password)
}

export const getFormFieldsState = formFields => {
  const state = {}
  Object.keys(formFields).forEach(key => {
    state[key] = {
      value: formFields[key],
      valid: false
    }
  })
  return state
}
