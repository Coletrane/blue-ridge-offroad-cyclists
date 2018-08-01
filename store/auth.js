import AuthService from "../services/AuthService"
import { viewActionTypes } from "./view"
import { variants, plsContact } from "../components/layout/Notifications"
import {userActionTypes} from "./user"

export const authState = {
  loading: false,
  loggedIn: false,
}

export const authActionTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  LOGOUT: "LOGOUT",
  CHECK_LOGGED_IN: "CHECK_LOGGED_IN"
}
const _authActionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  REGISTER_WITH_FACEBOOK_CALLBACK: "REGISTER_WITH_FACEBOOK_CALLBACK",
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
        user: {
          email: registeredUser.email,
          name: registeredUser.name
        }
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

export const registerWithFacebookCallback = fbRes => async dispatch => {
  if (fbRes.email && fbRes.name) {
    dispatch({
      type: viewActionTypes.OPEN_LOGIN_WINDOW,
      payload: {
        email: fbRes.email,
        name: fbRes.name,
        registering: true
      }
    })
    dispatch({
      type: _authActionTypes.REGISTER_WITH_FACEBOOK_CALLBACK
    })
  } else {
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: "There was a problem registering with Facebook, please register manually",
        variant: variants.warning
      }
    })
    dispatch({
      type: _authActionTypes.REGISTER_FAIL
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
      payload: {
        user: user
      }
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
        message: `There was an error logging you in. ${plsContact}`,
        variant: variants.error
      }
    })
  }
}

export const checkLoggedIn = () => async dispatch => {
  dispatch({
    type: authActionTypes.CHECK_LOGGED_IN
  })

  const user = await AuthService.getLoggedInUser()
  if (user && user.email) {
    dispatch({
      type: _authActionTypes.LOGIN_SUCCESS,
      payload: {
        loggedIn: true
      }
    })
    dispatch({
      type: userActionTypes.LOGGED_IN,
      payload: {
        user: user
      }
    })
  } else {
    dispatch({
      type: _authActionTypes.LOGIN_FAIL
    })
  }
}

export const logout = () => async dispatch => {
  dispatch({
    type: authActionTypes.LOGOUT
  })
  dispatch({
    type: userActionTypes.LOGGED_OUT
  })
  dispatch({
    type: viewActionTypes.OPEN_NOTIFICATION,
    payload: {
      message: "You have been successfully logged out.",
      variant: variants.success
    }
  })
  return AuthService.logout()
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
        loggedIn: true
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
        loggedIn: false
      }
    case _authActionTypes.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    case _authActionTypes.REGISTER_WITH_FACEBOOK_CALLBACK:
      return {
        ...state,
        loading: false
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
        ...state,
        loggedIn: false
      }
    case authActionTypes.CHECK_LOGGED_IN:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
