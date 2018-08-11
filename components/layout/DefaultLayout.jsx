import React from "react"
import Router from "next/router"
import Head from "next/head"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Link from "next/link"
import LoginWindow from "../modals/LoginWindow"
import VerificationCodeWindow from "../modals/VerificationCodeWindow"
import Notifications from "../modals/Notifications"
import BROCFooter from "./BROCFooter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserEdit } from "@fortawesome/free-solid-svg-icons/faUserEdit"

import PropTypes from "prop-types"
import styled from "styled-components"

import { connect } from "react-redux"
import { mapStateToProps } from "../../store/helpers"
import { viewActionTypes } from "../../store/view"
import { logout } from "../../store/auth"

import { img } from "../../util/routes"
import { fonts, cssFont } from "../../util/styles"
import withMobileDialog from "@material-ui/core/withMobileDialog/index"

class DefaultLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element)
  }
  static defaultProps = {
    title: "Roanoke International Mountain Biking Association"
  }

  openLoginWindow = registering => () => {
    this.props.dispatch({
      type: viewActionTypes.OPEN_LOGIN_WINDOW,
      payload: {
        registering: registering
      }
    })
  }

  logout = async () => {
    await this.props.dispatch(logout())
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
              <a id="broc-logo">
                <BROCLogo src={`${img}/roanoke-chapter-white.png`} />
              </a>
            </Link>
            <BROCTitle>
              <Link href="/">
                <a id="broc-title">
                  <h1>Blue Ridge Offroad Cyclists</h1>
                </a>
              </Link>
            </BROCTitle>
            <AuthToolbar>
              {!this.props.store.auth.loading &&
                this.props.store.auth.loggedIn && (
                  <div>
                    <Button
                      id="profile-button"
                      variant="contained"
                      color="secondary"
                      onClick={this.goToProfile}
                    >
                      <span>
                        <Username>
                          <div>{this.props.store.user.name}</div>
                          <div>{this.props.store.user.email}</div>
                        </Username>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </span>
                    </Button>
                    <Button
                      id="logout-button"
                      variant="contained"
                      color="secondary"
                      onClick={this.logout}
                    >
                      <h3>Logout</h3>
                    </Button>
                  </div>
                )}
              {!this.props.store.auth.loading &&
                !this.props.store.auth.loggedIn && (
                  <div>
                    <Button
                      id="register-button"
                      variant="contained"
                      color="secondary"
                      onClick={this.openLoginWindow(true)}
                    >
                      <h3>Register</h3>
                    </Button>
                    <Button
                      id="login-button"
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
        {this.props.store.view.notification.open && <Notifications />}
        {this.props.store.view.loginWindow.open && (
          <LoginWindow
            email={this.props.store.view.loginWindow.email}
            name={this.props.store.view.loginWindow.name}
          />
        )}
        {this.props.store.view.verificationCodeWindow.open && <VerificationCodeWindow />}
        {this.props.children}
        <BROCFooter />
      </div>
    )
  }
}

const BROCLogo = styled.img`
  width: 6rem;
  padding: 0.25rem;
`
const BROCTitle = styled.div`
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
    margin-right: 0.5rem;
  }
  button:last-child {
    margin-left: 0.5rem;
  }
`
const Username = styled.span`
  font-family: ${cssFont(fonts.IBMPlexMono)};
  display: inline-block;
  vertical-align: middle;
  padding: 0 1rem;
  cursor: pointer;
`

export default connect(mapStateToProps)(withMobileDialog()(DefaultLayout))
