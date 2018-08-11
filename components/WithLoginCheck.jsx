import React from "react"
import Router from "next/router"

import { connect } from "react-redux"
import { mapStateToProps } from "../store/helpers"
import { checkLoggedIn } from "../store/auth"
import { viewActionTypes } from "../store/view"

const withLoginCheck = (WrappedComponent, isProtectedRoute) => {
  class WithLoginCheck extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        checkUserCalled: false,
        protectedRouteCalled: false
      }
    }

    componentDidMount() {
      this.props.dispatch(checkLoggedIn())
    }

    componentDidUpdate() {
      if (!this.state.checkUserCalled && this.props.store.auth.loading) {
        this.setState({
          checkUserCalled: true
        })
      }
      if (
        this.state.checkUserCalled &&
        !this.props.store.auth.loading &&
        !this.props.store.auth.loggedIn &&
        isProtectedRoute &&
        !this.state.protectedRouteCalled
      ) {
        this.setState(
          {
            protectedRouteCalled: true
          },
          () => {
            this.props.dispatch({
              type: viewActionTypes.OPEN_LOGIN_WINDOW
            })
            Router.push("/")
          }
        )
      }
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return connect(mapStateToProps)(WithLoginCheck)
}

export default withLoginCheck
