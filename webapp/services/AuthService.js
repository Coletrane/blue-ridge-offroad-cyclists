import Amplify, { Auth } from "aws-amplify"
import {notAuthString} from "../../constants"

Amplify.configure({
  Auth: {
    identityPoolId: process.env.COGNITO_FEDERATED_POOL_ID,
    userPoolId: process.env.COGNITO_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
    region: "us-east-1"
  }
})

const register = async user => {
  const attributes = {
    name: user.name,
    address: user.address,
    email: user.email
  }
  if (user.phone) {
    attributes["phone_number"] = user.phone
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
    // Logged in without facebook
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
