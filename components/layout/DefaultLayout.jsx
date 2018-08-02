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
import { logout } from "../../store/auth"

import { img } from "../../util/routes"
import { fonts, cssFont } from "../../util/styles"

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
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

  openLoginWindow = registering => () => {
    this.props.openLoginWindow({
      registering: registering
    })
  }

  logout = async () => {
    await this.props.logout()
    Router.push("/")
  }

  goToProfile = () => {
    Router.push("/profile")
  }

  render() {
    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <AppBar position="static">
          <Toolbar>
            <Link href="/">
              <a>
                <RIMBALogo src={`${img}/roanoke-chapter-white.png`} />
              </a>
            </Link>
            <RIMBATitle>
              <Link href="/">
                <a>
                  <h1>Roanoke IMBA</h1>
                </a>
              </Link>
            </RIMBATitle>
            <AuthToolbar>
            {!this.props.auth.loading &&
              this.props.auth.loggedIn && (
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.goToProfile}
                  >
                    <span>
                      <Username>
                        <div>{this.props.user.name}</div>
                        <div>{this.props.user.email}</div>
                      </Username>
                      <FontAwesomeIcon icon={faUserEdit} />
                    </span>
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.logout}
                  >
                    <h3>Logout</h3>
                  </Button>
                </div>
              )}
            {!this.props.auth.loading &&
              !this.props.auth.loggedIn && (
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.openLoginWindow(true)}
                  >
                    <h3>Register</h3>
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.openLoginWindow(false)}
                  >
                    <h3>Login</h3>
                  </Button>
                </div>
              )}
            </AuthToolbar>
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
  padding: 0.25rem;
`
const RIMBATitle = styled.div`
  flex: 1;
  a {
    text-decoration: none;
    color: white;
  }
`
const AuthToolbar = styled.span`
  button {
    height: 4rem;
  }
  button:first-child {
    margin-right: .5rem;
  }
  button:last-child {
    margin-left: .5rem;
  }
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
