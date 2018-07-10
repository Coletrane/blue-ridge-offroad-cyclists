import React from "react"
import Link from "next/link"
import Head from "next/head"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import LoginWindow from "../login-window"

import styled from "styled-components"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { authActionTypes } from "../../store/auth"
import { viewActionTypes } from "../../store/view"

import { githubUrl } from "../../../constants"

const mapStateToProps = state => ({
  ...state.auth,
  ...state.view
})

const mapDispatchToProps = dispatch => ({
  logout: () =>
    dispatch({
      type: authActionTypes.LOGOUT
    }),
  openLoginWindow: payload =>
    dispatch({
      type: viewActionTypes.OPEN_LOGIN_WINDOW,
      ...payload
    }),
  closeLoginWindow: () =>
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW
    })
})

class DefaultLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.element
  }
  static defaultProps = {
    title: "Roanoke International Mountain Biking Association"
  }

  constructor(props) {
    super(props)
    this.state = {
      registering: false
    }
  }

  async openLoginWindow(registering) {
    await this.setState({
      registering: registering
    })
    this.props.openLoginWindow()
  }
  closeLoginWindow() {
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
            <MenuButton>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
            </MenuButton>
            <Title>Roanoke IMBA</Title>
            {(() => {
              if (this.props.loggedIn) {
                return (
                  <Button color="inherit" onClick={this.logout()}>
                    <h3>Logout</h3>
                  </Button>
                )
              } else {
                return (
                  <div>
                    <Button
                      color="inherit"
                      onClick={() => this.openLoginWindow(true)}
                    >
                      <h3>Register</h3>
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => this.openLoginWindow(false)}
                    >
                      <h3>Login</h3>
                    </Button>
                  </div>
                )
              }
            })()}
          </Toolbar>
        </AppBar>
        <LoginWindow registering={this.state.registering} />
        {this.props.children}
        <footer>
          Copyright 2018 Cole Inman
          <Link href={githubUrl}>
            <a>GitHub</a>
          </Link>
        </footer>
      </div>
    )
  }
}

const MenuButton = styled.div`
  svg {
    font-size: 38px;
  }
`

const Title = styled.h1`
  flex: 1;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout)
