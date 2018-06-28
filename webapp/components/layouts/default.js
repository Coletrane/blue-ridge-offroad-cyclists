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

import { githubUrl } from "../../../consants"

export default class DefaultLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.element
  }
  static defaultProps = {
    title: "Roanoke International Mountain Biking Association"
  }

  get loginButton() {
    let text
    // let loginLogoutFn

    const notLoggedIn = false
    if (notLoggedIn) {
      text = "Login"
    } else {
      text = "Logout"
    }

    return {
      text: text
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
            <Button color="inherit">
              <h2>{this.loginButton.text}</h2>
            </Button>
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
