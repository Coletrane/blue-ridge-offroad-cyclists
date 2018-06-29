import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import {authState, authReducer} from "./auth"
import {viewState, viewReducer} from "./view"

const state = {
  auth: authState,
  view: viewState
}

const reducer = combineReducers({
  auth: authReducer,
  view: viewReducer
})

export const initializeStore = (initialState = state) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware()))
}