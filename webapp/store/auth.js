import AuthService from "../services/AuthService"
import {viewActionTypes} from "./view"
import {variants, plsContact} from "../components/layout/Notifications"

export const authState = {
  loading: false,
  loggedIn: false,
  // Maps to what we have in Cognito
  user: {
    email: "",
    phone: null,
    name: "",
    address: ""
  }
  // role: ""
}

export const authActionTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  CONFIRM_REGISTER: "CONFIRM_REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  LOGOUT: "LOGOUT",
}
const _authActionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  CONFIRM_REGISTER_SUCCESS: "CONFIRM_REGISTER_SUCCESS",
  CONFIRM_REGISTER_FAIL: "CONFIRM_REGISTER_FAIL",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAIL: "FORGOT_PASSWORD_FAIL"
}

// TODO: check all the payloads from AuthService
export const register = user => async dispatch => {
  dispatch({
    type: authActionTypes.REGISTER
  })

  try {
    const res = await AuthService.register(user)
    dispatch({
      type: _authActionTypes.REGISTER_SUCCESS,
      payload: res
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
  } catch (err) {
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

export const confirmRegister = (email, code) => async dispatch => {
  dispatch({
    type: authActionTypes.CONFIRM_REGISTER
  })

  try {
    const res = await AuthService.confirmRegister(email, code)
    dispatch({
      type: _authActionTypes.CONFIRM_REGISTER_SUCCESS,
      payload: res
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: "You have successfully verified your registration",
        variant: variants.success
      }
    })
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW
    })
  } catch (err) {
    dispatch({
      type: _authActionTypes.CONFIRM_REGISTER_FAIL
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: `There was an error confirming your registration. ${plsContact}`,
        variant: variants.error
      }
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
      type:  _authActionTypes.FORGOT_PASSWORD_FAIL
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

  try {
    const res = AuthService.login(email, password)
    dispatch({
      type: _authActionTypes.LOGIN_SUCCESS
    })
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW
    })
  } catch (err) {
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
    case authActionTypes.REGISTER:
      return {
        ...state,
        loading: true
      }
    case _authActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case _authActionTypes.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    case _authActionTypes.CONFIRM_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: action.payload
      }
    case _authActionTypes.CONFIRM_REGISTER_FAIL:
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
    case authActionTypes.LOGOUT:
      return {
        ...state
      }
    default:
      return state
  }
}
