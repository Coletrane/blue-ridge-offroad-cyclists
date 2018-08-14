import { passwordMessages, viewActionTypes } from "../store/view"
import { variants } from "../components/modals/Notifications"

export const userProfileInputValid = state => {
  return (
    state.emailValid &&
    state.phoneValid &&
    state.nameValid &&
    state.addressValid &&
    state.zipCodeValid
  )
}

export const passwordInputValid = state => {
  return (
    state.oldPasswordValid &&
    state.newPasswordValid &&
    state.newPasswordConfirmValid &&
    state.newPassword === state.newPasswordConfirm
  )
}

export const splitAddress = address => {
  const addressSplit = address.split(" ")
  let zipCode = addressSplit[addressSplit.length - 1]
  try {
    zipCode = parseInt(zipCode).toString()
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

export const openPasswordReqsNotification = dispatch => {
  dispatch({
    type: viewActionTypes.OPEN_NOTIFICATION,
    payload: {
      message: `Your password ${passwordMessages.requirements
        .charAt(0)
        .toLowerCase()}${passwordMessages.requirements.slice(1)}`,
      variant: variants.warning
    }
  })
}

export const openPasswordNoMatchNotification = dispatch => {
  dispatch({
    type: viewActionTypes.OPEN_NOTIFICATION,
    payload: {
      message: passwordMessages.noMatch,
      variant: variants.warning
    }
  })
}
