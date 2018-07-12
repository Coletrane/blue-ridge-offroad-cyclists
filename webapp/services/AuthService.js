import Amplify, { Auth } from "aws-amplify"

Amplify.configure({
  Auth: {
    userPoolId: process.env.COGNITO_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
    region: "us-east-1"
  }
})

export default {
  register: async user => {
    const attributes = {
      name: user.name,
      address: user.address,
      email: user.email
    }
    if (user.phone) {
      attributes.phone = user.phone
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
  },

  confirmRegister: async (email, code) => {
    try {
      await Auth.confirmSignUp(email, code)
      // TODO: inspect response and get user details
      return {
        email: email
      }
    } catch (err) {
      return null
    }
  },

  forgotPassword: async email => {
    try {
      await Auth.forgotPassword(email)
      return {
        email: email
      }
    } catch (err) {
      return  null
    }
  },

  login: async (email, password) => {
    try {
      const res = await Auth.signIn(email, password)
      console.log(res)
      return {
        email: email,
        password: password
      }
    } catch (err) {
      return null
    }
  }
}
