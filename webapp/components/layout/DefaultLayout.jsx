import React from "react"
import Head from "next/head"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

import LoginWindow from "./LoginWindow"
import Notifications from "./Notifications"
import RIMBAFooter from "./RIMBAFooter"

import PropTypes from "prop-types"
import styled from "styled-components"

import { connect } from "react-redux"
import { viewActionTypes } from "../../store/view"
import { checkLoggedIn } from "../../store/auth"

const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view
})

const mapDispatchToProps = dispatch => ({
  openLoginWindow: payload =>
    dispatch({
      type: viewActionTypes.OPEN_LOGIN_WINDOW,
      payload: {
        ...payload
      }
    }),
  checkLoggedIn: () => {
    dispatch(checkLoggedIn())
  }
})

class DefaultLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element)
  }
  static defaultProps = {
    title: "Roanoke International Mountain Biking Association"
  }

  constructor(props) {
    super(props)
    this.props.checkLoggedIn()
  }

  openLoginWindow = registering => () => {
    this.props.openLoginWindow({
      registering: registering
    })
  }
  closeLoginWindow = () => {
    this.props.closeLoginWindow()
  }

  render() {
    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <AppBar position="static">
          <Toolbar>
            <RIMBATitle className="rimba-title">Roanoke IMBA</RIMBATitle>
            {(() => {
              if (this.props.loggedIn) {
                return (
                  <Button color="inherit">
                    <h3>Logout</h3>
                  </Button>
                )
              } else {
                return (
                  <div>
                    <Button
                      color="inherit"
                      onClick={this.openLoginWindow(true)}
                    >
                      <h3>Register</h3>
                    </Button>
                    <Button
                      color="inherit"
                      onClick={this.openLoginWindow(false)}
                    >
                      <h3>Login</h3>
                    </Button>
                  </div>
                )
              }
            })()}
          </Toolbar>
        </AppBar>
        {this.props.view.notification.open && <Notifications />}
        {this.props.view.loginWindow.open && <LoginWindow />}
        {this.props.children}
        <RIMBAFooter />
      </div>
    )
  }
}

const RIMBATitle = styled.h1`
  flex: 1;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
