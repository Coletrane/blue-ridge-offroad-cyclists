export const viewState = {
  loginWindowOpen: false,
  notification: {
    open: false,
    message: "",
    variant: "",
    onClose: () => {} // TODO: figure out how to make this work
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
      if (!state.loginWindowOpen) {
        return {
          ...state,
          loginWindowOpen: true
        }
      } else {
        return state
      }
    case viewActionTypes.CLOSE_LOGIN_WINDOW:
      if (state.loginWindowOpen) {
        return {
          ...state,
          loginWindowOpen: false
        }
      } else {
        return state
      }
    case viewActionTypes.OPEN_NOTIFICATION:
      if (!state.notification.open) {
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
