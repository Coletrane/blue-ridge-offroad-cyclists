import React from "react"
import Router from "next/router"

import { connect } from "react-redux"
import { mapStateToProps } from "../store/helpers"
import { checkLoggedIn } from "../store/auth"
import { viewActionTypes } from "../store/view"
import {checkProtectedRoute} from "../util/routes"

const withLoginCheck = WrappedComponent => {
  class WithLoginCheck extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loginCheckPromise: false,
        protectedRouteCalled: false
      }
    }

    componentDidMount() {
      this.setState({
        loginCheckPromise: this.props.dispatch(checkLoggedIn())
      })
      checkProtectedRoute(Router.route, this.props.dispatch)
      Router.beforePopState((route) => {
        checkProtectedRoute(route.as, this.props.dispatch)
      })
    }

    async componentDidUpdate() {
      await this.state.loginCheckPromise
      if (
        !this.props.store.auth.loggedIn &&
        this.props.store.view.protectedRoute &&
        !this.state.protectedRouteCalled
      ) {
        this.setState(
          {
            protectedRouteCalled: true
          },
          () => {
            Router.push("/")
            this.props.dispatch({
              type: viewActionTypes.OPEN_LOGIN_WINDOW
            })
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
