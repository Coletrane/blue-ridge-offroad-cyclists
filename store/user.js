import _ from "lodash"
import UserService from "../services/UserService"
import { viewActionTypes } from "./view"
import { variants, plsContact } from "../components/modals/Notifications"
import { validPassword } from "../util/user-info-helpers"

// Maps to what we have in Cognito
export const userState = {
  loading: false,
  email: "",
  email_verified: false,
  phone_number: -1,
  phone_verified: false,
  name: "",
  address: "",
  // facebook login specific properties
  accessToken: "",
  expiresIn: -1,
  id: "",
  reauthorize_required_in: -1,
  signedRequest: "",
  userID: ""
}

export const userActionTypes = {
  LOGGED_IN: "LOGGED_IN",
  LOGGED_OUT: "LOGGED_OUT"
}
const _userActionTypes = {
  UPDATE_PROFILE: "UPDATE_PROFILE",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAIL: "UPDATE_PROFILE_FAIL",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  UPDATE_PASSWORD_SUCCESS: "UPDATE_PASSWORD_SUCCESS",
  UPDATE_PASSWORD_FAIL: "UPDATE_PASSWORD_FAIL",
  VERIFY_CODE: "VERIFY_CODE",
  VERIFY_CODE_SUCCESS: "VERIFY_CODE_SUCCESS",
  VERIFY_CODE_FAIL: "VERIFY_CODE_FAIL",
  RESEND_CODE: "RESEND_CODE",
  RESEND_CODE_SUCCESS: "RESEND_CODE_SUCCESS",
  RESEND_CODE_FAIL: "RESEND_CODE_FAIL"
}

const sanitizeUser = user => {
  const sanitizedUser = {
    ...user,
    phone_number: user.phone,
    address: `${user.address} ${user.city} ${user.state.abbreviation} ${
      user.zipCode
    }`.replace("  ", " ")
  }
  return _.pick(sanitizedUser, _.keys(userState))
}

export const updateUser = payload => async (dispatch, getState) => {
  const sanitizedUser = sanitizeUser(payload.user)
  const userDiff = _.keys(sanitizedUser).find(key => {
    // Make sure spaces in address don't cause unecessary network calls
    if (key === "address") {
      let stateAddress = getState().user[key]
      while (stateAddress.includes(" ")) {
        stateAddress = stateAddress.replace(" ", "")
      }
      let userAddress = sanitizedUser[key]
      while (userAddress.includes(" ")) {
        userAddress = userAddress.replace(" ", "")
      }
      return stateAddress !== userAddress
    } else {
      return getState().user[key] !== sanitizedUser[key]
    }
  })

  if (userDiff) {
    dispatch({
      type: _userActionTypes.UPDATE_PROFILE
    })
    const user = await UserService.updateUser(sanitizedUser)
    if (user) {
      dispatch({
        type: _userActionTypes.UPDATE_PROFILE_SUCCESS,
        payload: {
          user: user
        }
      })
      if (userDiff === "email") {
        dispatch({
          type: viewActionTypes.OPEN_NOTIFICATION,
          payload: {
            message: `Please check your inbox ${
              user.email
            } for a verification code in order to finish updating your profile.`,
            variant: variants.warning
          }
        })
        dispatch({
          type: viewActionTypes.OPEN_VERIFICATION_CODE_WINDOW,
          payload: {
            cancellable: false
          }
        })
      } else {
        dispatch({
          type: viewActionTypes.OPEN_NOTIFICATION,
          payload: {
            message: "Your profile has been updated successfully!",
            variant: variants.success
          }
        })
      }
    } else {
      dispatch({
        type: _userActionTypes.UPDATE_PROFILE_FAIL
      })
      dispatch({
        type: viewActionTypes.OPEN_NOTIFICATION,
        payload: {
          message: `Your profile could not be updated ${plsContact}`,
          variant: variants.error
        }
      })
    }
  }
}

export const verifyCode = payload => async (dispatch, getState) => {
  if (!getState().user.email_verified) {
    dispatch({
      type: _userActionTypes.VERIFY_CODE
    })
    const user = await UserService.verifyNewEmail(
      getState().user.email,
      payload.code
    )
    if (user) {
      dispatch({
        type: _userActionTypes.VERIFY_CODE_SUCCESS,
        payload: {
          user: user
        }
      })
      dispatch({
        type: viewActionTypes.OPEN_NOTIFICATION,
        payload: {
          message: "Your email has been verified successfully!",
          variant: variants.success
        }
      })
      dispatch({
        type: viewActionTypes.CLOSE_VERIFICATION_CODE_WIDNOW
      })
    } else {
      dispatch({
        type: viewActionTypes.OPEN_NOTIFICATION,
        payload: {
          message: `We were unable to verify your email. ${plsContact}`,
          variant: variants.error
        }
      })
      dispatch({
        type: viewActionTypes.CLOSE_VERIFICATION_CODE_WIDNOW
      })
    }
  }
}

export const resendCode = () => async (dispatch, getState) => {
  const email = getState().user.email
  if (email && !getState().user.email_verified) {
    dispatch({
      type: _userActionTypes.RESEND_CODE
    })
    const res = UserService.resendVerificationCode(email)
    if (res) {
      dispatch({
        type: _userActionTypes.RESEND_CODE_SUCCESS
      })
      dispatch({
        type: viewActionTypes.OPEN_NOTIFICATION,
        payload: {
          message: `We have sent a verification code to ${email}. Please check your inbox and enter the code here`,
          variant: variants.info
        }
      })
      dispatch({
        type: viewActionTypes.CLOSE_LOGIN_WINDOW
      })
      dispatch({
        type: viewActionTypes.OPEN_VERIFICATION_CODE_WINDOW
      })
    } else {
      dispatch({
        type: _userActionTypes.RESEND_CODE_FAIL
      })
      dispatch({
        type: viewActionTypes.OPEN_NOTIFICATION,
        payload: {
          message: `We were unable to send a verification code. ${plsContact}`,
          variant: variants.warning
        }
      })
    }
  }
}

export const updatePassword = payload => async dispatch => {
  if (
    !payload.oldPassword ||
    !payload.newPassword ||
    !payload.newPasswordConfirm ||
    payload.newPassword !== payload.newPasswordConfirm ||
    !validPassword(payload.newPassword)
  ) {
    return
  }
  dispatch({
    type: _userActionTypes.UPDATE_PASSWORD
  })
  const user = await UserService.changePassword(
    payload.oldPassword,
    payload.newPassword
  )
  if (user) {
    dispatch({
      type: _userActionTypes.UPDATE_PASSWORD_SUCCESS
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: "Your password has been updated successfully.",
        variant: variants.success
      }
    })
  } else {
    dispatch({
      type: _userActionTypes.UPDATE_PASSWORD_FAIL
    })
    dispatch({
      type: viewActionTypes.CLOSE_NOTIFICATION,
      payload: {
        message: `There was a problem updating your password ${plsContact}`,
        variant: variants.error
      }
    })
  }
}

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case _userActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        loading: true
      }
    case _userActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload.user,
        loading: false
      }
    case _userActionTypes.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false
      }
    case _userActionTypes.UPDATE_PASSWORD:
      return {
        ...state,
        loading: true
      }
    case _userActionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case _userActionTypes.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false
      }
    case _userActionTypes.VERIFY_CODE:
      return {
        ...state,
        loading: true
      }
    case _userActionTypes.VERIFY_CODE_SUCCESS:
      return {
        ...state,
        ...action.payload.user,
        loading: false
      }
    case _userActionTypes.VERIFY_CODE_FAIL:
      return {
        ...state,
        loading: false
      }
    case _userActionTypes.RESEND_CODE:
      return {
        ...state,
        loading: true
      }
    case _userActionTypes.RESEND_CODE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case _userActionTypes.RESEND_CODE_FAIL:
      return {
        ...state,
        loading: false
      }
    case userActionTypes.LOGGED_IN:
      return {
        ...state,
        ...action.payload.user,
        loading: false
      }
    case userActionTypes.LOGGED_OUT:
      return {
        ...userState
      }
    default:
      return state
  }
}
