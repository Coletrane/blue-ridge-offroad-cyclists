import {register} from "../services/auth-service"

export const authState = {
  loading: false,
  loggedIn: false,
  // Maps to what we have in Cognito
  user: {
    email: "",
    phone: null,
    name: "",
    address: ""
  },
  // role: ""
}

export const authActionTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT"
}
const _authActionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL"
}

export const registerAction = user => async dispatch => {
  dispatch({
    type: authActionTypes.REGISTER
  })

  try {
    const registeredUser = await register(user)
    dispatch({
      type: _authActionTypes.REGISTER_SUCCESS,
      payload: registeredUser
    })
  } catch (err) {
    dispatch({
      type: _authActionTypes.REGISTER_FAIL
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
        user: action.payload,
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
        loggedIn: true,
        user: action.payload,
      }
    case _authActionTypes.REGISTER_FAIL:
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
