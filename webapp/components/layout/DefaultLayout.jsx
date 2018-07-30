import React from "react"
import Router from "next/router"
import Head from "next/head"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Link from "next/link"
import LoginWindow from "./LoginWindow"
import Notifications from "./Notifications"
import RIMBAFooter from "./RIMBAFooter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserEdit } from "@fortawesome/free-solid-svg-icons/faUserEdit"

import PropTypes from "prop-types"
import styled from "styled-components"

import { connect } from "react-redux"
import { viewActionTypes } from "../../store/view"
import { checkLoggedIn, logout, authActionTypes } from "../../store/auth"

import { img } from "../../util/routes"

import { fonts, cssFont } from "../../util/styles"

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
  },
  logout: () => {
    return dispatch(logout())
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

  logout = async () => {
    await this.props.logout()
    Router.push("/")
  }

  render() {
    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <AppBar position="static">
          <Toolbar>
            <RIMBALogo src={`${img}/roanoke-chapter-white.png`} />
            <RIMBATitle className="rimba-title">Roanoke IMBA</RIMBATitle>
            {!this.props.auth.loading &&
              this.props.auth.loggedIn && (
                <div>
                  <Link href="/profile">
                    <span>
                      <FontAwesomeIcon icon={faUserEdit} />
                      <Username>
                        <div>{this.props.auth.user.name}</div>
                        <div>{this.props.auth.user.email}</div>
                      </Username>
                    </span>
                  </Link>
                  <Button color="inherit" onClick={this.logout}>
                    <h3>Logout</h3>
                  </Button>
                </div>
              )}
            {!this.props.auth.loading &&
              !this.props.auth.loggedIn && (
                <div>
                  <Button color="inherit" onClick={this.openLoginWindow(true)}>
                    <h3>Register</h3>
                  </Button>
                  <Button color="inherit" onClick={this.openLoginWindow(false)}>
                    <h3>Login</h3>
                  </Button>
                </div>
              )}
          </Toolbar>
        </AppBar>
        {this.props.view.notification.open && <Notifications />}
        {this.props.view.loginWindow.open && (
          <LoginWindow
            email={this.props.view.loginWindow.email}
            name={this.props.view.loginWindow.name}
          />
        )}
        {this.props.children}
        <RIMBAFooter />
      </div>
    )
  }
}

const RIMBALogo = styled.img`
  width: 6rem;
  padding: .25rem;
`
const RIMBATitle = styled.h1`
  flex: 1;
`
const Username = styled.span`
  font-family: ${cssFont(fonts.IBMPlexMono)};
  display: inline-block;
  vertical-align: middle;
  padding: 0 1rem;
  cursor: pointer;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
