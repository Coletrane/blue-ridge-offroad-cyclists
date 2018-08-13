import Auth from "@aws-amplify/auth"
import { authConfig } from "../constants"
import AuthService from "./AuthService"

Auth.configure(authConfig)

const updateUser = async user => {
  try {
    const res = await Auth.updateUserAttributes(
      await Auth.currentAuthenticatedUser(),
      user
    )
    if (res === "SUCCESS") {
      return await AuthService.getLoggedInUser()
    }
  } catch (err) {
    return null
  }
}

const verifyNewEmail = async (email, code) => {
  try {
    const res = await Auth.verifyCurrentUserAttributeSubmit("email", code)
    if (res === "SUCCESS") {
      return await AuthService.getLoggedInUser()
    }
  } catch (err) {
    return null
  }
}

const resendVerificationCode = async email => {
  try {
    const res = await Auth.verifyCurrentUserAttribute("email")
    return res
  } catch (err) {
    return null
  }
}

export default {
  updateUser,
  verifyNewEmail,
  resendVerificationCode
}
