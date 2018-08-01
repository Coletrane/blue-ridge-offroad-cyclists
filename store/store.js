import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"

import { authState, authReducer } from "./auth"
import { userState, userReducer } from "./user"
import { viewState, viewReducer } from "./view"

const state = {
  auth: authState,
  user: userState,
  view: viewState
}

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  view: viewReducer
})

export const initializeStore = (initialState = state) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
