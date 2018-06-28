import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js"


const userPool = new CognitoUserPool({
  UserPoolId: process.env.COGNITO_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID
})

export const authState = {
  loggedIn: false,
  username: "",
  role: ""
}

export const authActionTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT"
}

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return {
        ...state
        // TODO
      }
    case authActionTypes.REGISTER:
      return {
        ...state
      }
    case authActionTypes.LOGOUT:
      return {
        ...state
      }
    default:
      return state
  }
}
