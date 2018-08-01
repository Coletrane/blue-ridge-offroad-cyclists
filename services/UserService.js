import Auth from "@aws-amplify/auth"
import {authConfig} from "../constants"

Auth.configure(authConfig)

const updateUser = async user => {
  try {
    Auth.updateUserAttributes(Auth.currentAuthenticatedUser(), user)
  } catch (err) {
    return null
  }
}

export default {
  updateUser
}