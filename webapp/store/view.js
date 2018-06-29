export const viewState = {
  loginWindowOpen: false,
}

export const viewActionTypes = {
  OPEN_LOGIN_WINDOW: "OPEN_LOGIN_WINDOW",
  CLOSE_LOGIN_WINDOW: "CLOSE_LOGIN_WINDOW"
}

export const viewReducer = (state = viewState, action) => {
  switch (action.type) {
    case viewActionTypes.OPEN_LOGIN_WINDOW:
      if (!state.loginWindowOpen) {
        return {
          ...state,
          loginWindowOpen: true,
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
    default:
      return state
  }
}
