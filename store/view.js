import { variants } from "../components/layout/Notifications"

export const passwordPopoverMessages = {
  requirements: "Must contain at least 8 characters and a special character.",
  noMatch: "Your new passwords must match."
}

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
    variant: ""
  },
  popover: {
    open: false,
    message: ""
  }
}

export const viewActionTypes = {
  OPEN_LOGIN_WINDOW: "OPEN_LOGIN_WINDOW",
  CLOSE_LOGIN_WINDOW: "CLOSE_LOGIN_WINDOW",
  OPEN_NOTIFICATION: "OPEN_NOTIFICATION",
  CLOSE_NOTIFICATION: "CLOSE_NOTIFICATION",
  OPEN_POPOVER: "OPEN_POPOVER",
  CLOSE_POPOVER: "CLOSE_POPOVER"
}

export const viewReducer = (state = viewState, action) => {
  switch (action.type) {
    case viewActionTypes.OPEN_LOGIN_WINDOW:
      return {
        ...state,
        loginWindow: {
          ...state.loginWindow,
          ...action.payload,
          open: true
        }
      }
    case viewActionTypes.CLOSE_LOGIN_WINDOW:
      return {
        ...state,
        loginWindow: {
          ...state.loginWindow,
          ...action.payload,
          open: false
        }
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
    case viewActionTypes.OPEN_POPOVER:
      if (!state.popover.open) {
        return {
          ...state,
          popover: {
            open: true,
            message: action.payload.message
          }
        }
      } else {
        return state
      }
    case viewActionTypes.CLOSE_POPOVER:
      if (state.popover.open) {
        return {
          ...state,
          popover: {
            open: false,
            message: ""
          }
        }
      } else {
        return state
      }
    default:
      return state
  }
}
