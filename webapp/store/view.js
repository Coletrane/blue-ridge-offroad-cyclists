import { variants } from "../components/layout/Notifications"

export const viewState = {
  loginWindow: {
    open: false,
    registering: false,
    email: "",
    name: ""
  },
  notification: {
    open: false,
    message: "",
    variant: "",
  }
}

export const viewActionTypes = {
  OPEN_LOGIN_WINDOW: "OPEN_LOGIN_WINDOW",
  CLOSE_LOGIN_WINDOW: "CLOSE_LOGIN_WINDOW",
  OPEN_NOTIFICATION: "OPEN_NOTIFICATION",
  CLOSE_NOTIFICATION: "CLOSE_NOTIFICATION"
}

export const viewReducer = (state = viewState, action) => {
  switch (action.type) {
    case viewActionTypes.OPEN_LOGIN_WINDOW:
      if (!state.loginWindow.open) {
        return {
          ...state,
          loginWindow: {
            ...action.payload,
            open: true
          }
        }
      } else {
        return state
      }
    case viewActionTypes.CLOSE_LOGIN_WINDOW:
      if (state.loginWindow.open) {
        return {
          ...state,
          loginWindow: {
            ...state.loginWindow,
            open: false
          }
        }
      } else {
        return state
      }
    case viewActionTypes.OPEN_NOTIFICATION:
      if (
        !state.notification.open &&
        Object.keys(variants).find(variant => {
          return (
            variant === action.payload.variant &&
            variants[variant] === action.payload.variant
          )
        })
      ) {
        return {
          ...state,
          notification: {
            ...action.payload,
            open: true
          }
        }
      } else {
        return state
      }
    case viewActionTypes.CLOSE_NOTIFICATION:
      if (state.notification.open) {
        return {
          ...state,
          notification: viewState.notification
        }
      } else {
        return state
      }
    default:
      return state
  }
}
