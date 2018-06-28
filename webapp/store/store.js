import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import {authState, authReducer} from "./auth"

const state = {
  auth: authState
}

const reducer = combineReducers({
  auth: authReducer
})

export const initializeStore = (initialState = state) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware()))
}