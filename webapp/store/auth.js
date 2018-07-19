import AuthService from "../services/AuthService"
import { viewActionTypes } from "./view"
import { variants, plsContact } from "../components/layout/Notifications"

export const authState = {
  loading: false,
  loggedIn: false,
  // Maps to what we have in Cognito
  user: {
    email: "",
    phone: "",
    name: "",
    address: ""
  }
  // role: ""
}

export const authActionTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  LOGOUT: "LOGOUT"
}
const _authActionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAIL: "FORGOT_PASSWORD_FAIL"
}

// TODO: check all the payloads from AuthService
export const register = user => async dispatch => {
  dispatch({
    type: authActionTypes.REGISTER
  })

  const registeredUser = await AuthService.register(user)
  if (registeredUser) {
    dispatch({
      type: _authActionTypes.REGISTER_SUCCESS,
      payload: {
        email: registeredUser.email,
        name: registeredUser.name
      }
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: "Please check your inbox and confirm your email address.",
        variant: variants.info
      }
    })
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW
    })
  } else {
    dispatch({
      type: _authActionTypes.REGISTER_FAIL
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: `There was an error registering. ${plsContact}`,
        variant: variants.error
      }
    })
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW
    })
  }
}

export const forgotPassword = email => async dispatch => {
  dispatch({
    type: authActionTypes.FORGOT_PASSWORD
  })

  try {
    const res = await AuthService.forgotPassword(email)
    dispatch({
      type: _authActionTypes.FORGOT_PASSWORD_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: _authActionTypes.FORGOT_PASSWORD_FAIL
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: "Check your inbox for a password reset link.",
        variant: variants.info
      }
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: `There was an error sending your password reset email. ${plsContact}`,
        variant: variants.error
      }
    })
  }
}

export const login = (email, password) => async dispatch => {
  dispatch({
    type: authActionTypes.LOGIN
  })

  const user = await AuthService.login(email, password)
  if (user) {
    dispatch({
      type: _authActionTypes.LOGIN_SUCCESS,
      payload: user
    })
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW
    })
  } else {
    dispatch({
      type: _authActionTypes.LOGIN_FAIL
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: `There was an error logging you in. ${plsContact}`
      }
    })
  }
}

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case authActionTypes.REGISTER:
      return {
        ...state,
        loading: true
      }
    case _authActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: action.payload
      }
    case _authActionTypes.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    case _authActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    case _authActionTypes.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    case authActionTypes.LOGIN:
      return {
        ...state,
        loading: true
      }
    case _authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: action.payload
      }
    case _authActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    case authActionTypes.LOGOUT:
      return {
        ...state
      }
    default:
      return state
  }
}
