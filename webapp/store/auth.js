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
  role: ""
}

export const authActionTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT"
}
export const login = dispatch => {
  return dispatch({
    type: authActionTypes.LOGIN,
  })
}
export const register = dispatch => {
  return dispatch({
    type: authActionTypes.REGISTER
  })
}
export const logout = dispatch => {
  return dispatch({
    type: authActionTypes.LOGOUT
  })
}

export const authServiceActionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL"
}

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return {
        ...state,
        loading: true
      }
    case authServiceActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        email: action.payload.email,
        role: action.payload.role
      }
    case authServiceActionTypes.LOGIN_FAIL:
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
    case authServiceActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        email: action.payload.email,
        role: action.payload.role
      }
    case authServiceActionTypes.REGISTER_FAIL:
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
