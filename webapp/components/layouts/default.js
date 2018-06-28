import React from "react"
import Link from "next/link"
import Head from "next/head"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import styled from "styled-components"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { logout } from "../../store/auth"
import { githubUrl } from "../../../constants"

const mapStateToProps = state => ({ ...state.auth })

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
      loginWindowOpen: false
    }
  }

  logout() {
    const { dispatch } = this.props
    dispatch(logout)
  }

  openLoginWindow() {
    this.setState({
      loginWindowOpen: true
    })
  }
  closeLoginWindow() {
    this.setState({
      loginWindowOpen: false
    })
  }

  get loginButton() {
    if (this.props.loggedIn) {
      return (
        <Button color="inherit" onClick={this.logout()}>
          <h3>Logout</h3>
        </Button>
      )
    } else {
      return (
        <div>
          <Button color="inherit">
            <h3>Register</h3>
          </Button>
          <Button color="inherit">
            <h3>Login</h3>
          </Button>
        </div>
      )
    }
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
            {this.loginButton}
          </Toolbar>
        </AppBar>
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

export default connect(mapStateToProps)(DefaultLayout)
