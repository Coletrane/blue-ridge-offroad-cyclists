import Auth from "@aws-amplify/auth"
import {authConfig} from "../constants"

Auth.configure(authConfig)

const updateUser = async user => {
  try {
    Auth.updateUserAttributes(await Auth.currentAuthenticatedUser(), user)
    return user
  } catch (err) {
    return null
  }
}

const verifyNewEmail = async (email, code) => {
  try {
    Auth.verifyCurrentUserAttributeSubmit({email: email}, code)
    return email
  } catch (err) {
    return null
  }
}

export default {
  updateUser
}