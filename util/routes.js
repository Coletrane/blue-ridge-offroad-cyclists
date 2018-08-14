import { viewActionTypes } from "../store/view"

export const img = "/static/img"
export const protectedRoutes = ["/profile"]

export const checkProtectedRoute = (route, dispatch) => {
  const protectedRoute = protectedRoutes.find(protRoute => {
    return protRoute === route
  })
  dispatch({
    type: viewActionTypes.SET_PROTECTED_ROUTE,
    payload: {
      protectedRoute: protectedRoute ? true : false
    }
  })
}
