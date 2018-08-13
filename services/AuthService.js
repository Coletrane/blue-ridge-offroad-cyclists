import Auth from "@aws-amplify/auth"
import { authConfig } from "../constants"

Auth.configure(authConfig)

const register = async user => {
  const attributes = {
    name: user.name,
    address: user.address,
    email: user.email,
    phone_number: user.phone
  }

  try {
    await Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: attributes
    })
    return {
      email: user.email,
      name: user.name,
      phone: user.phone,
      address: user.address
    }
  } catch (err) {
    // TODO: sentry or something here
    return null
  }
}

const forgotPassword = async email => {
  try {
    await Auth.forgotPassword(email)
    return {
      email: email
    }
  } catch (err) {
    return null
  }
}

const login = async (email, password) => {
  try {
    await Auth.signIn(email, password)
    return await getLoggedInUser()
  } catch (err) {
    return null
  }
}

const getLoggedInUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    if (user.attributes) {
      return user.attributes
    }
  } catch (err) {
    return err
  }
}

const logout = async () => {
  try {
    return await Auth.signOut()
  } catch (err) {
    return err
  }
}

export default {
  register,
  forgotPassword,
  login,
  getLoggedInUser,
  logout
}
