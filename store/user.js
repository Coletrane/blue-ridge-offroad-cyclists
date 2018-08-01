import UserService from "../services/UserService"
import { viewActionTypes } from "./view"
import { variants, plsContact } from "../components/layout/Notifications"

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
  UPDATE_PROFILE: "UPDATE_PROFILE",
  LOGGED_IN: "LOGGED_IN",
  LOGGED_OUT: "LOGGED_OUT"
}
const _userActionTypes = {
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAIL: "UPDATE_PROFILE_FAIL"
}

export const updateUser = user => async dispatch => {
  dispatch({
    type: userActionTypes.UPDATE_PROFILE
  })

  const updatedUser = await UserService.updateUser(user)
  if (updatedUser) {
    dispatch({
      type: _userActionTypes.UPDATE_PROFILE_SUCCESS,
      payload: {
        user: updatedUser
      }
    })
    dispatch({
      type: viewActionTypes.OPEN_NOTIFICATION,
      payload: {
        message: "Your profile has been updated successfully!",
        variant: variants.success
      }
    })
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

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case userActionTypes.UPDATE_PROFILE:
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
