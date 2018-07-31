import React from "react"
import Router from "next/router"

import { connect } from "react-redux"
import { checkLoggedIn } from "../store/auth"
import { viewActionTypes } from "../store/view"

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  checkLoggedIn: () => dispatch(checkLoggedIn()),
  openLoginWindow: () =>
    dispatch({
      type: viewActionTypes.OPEN_LOGIN_WINDOW
    })
})

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
      this.props.checkLoggedIn()
    }

    componentDidUpdate() {
      if (!this.state.checkUserCalled && this.props.auth.loading) {
        this.setState({
          checkUserCalled: true
        })
      }
      if (
        this.state.checkUserCalled &&
        !this.props.auth.loading &&
        !this.props.auth.loggedIn &&
        isProtectedRoute &&
        !this.state.protectedRouteCalled
      ) {
        this.setState(
          {
            protectedRouteCalled: true
          },
          () => {
            this.props.openLoginWindow()
            Router.push("/")
          }
        )
      }
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithLoginCheck)
}

export default withLoginCheck
