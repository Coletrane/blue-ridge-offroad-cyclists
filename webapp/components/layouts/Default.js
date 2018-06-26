import React from "react"
import Link from "next/link"
import Head from "next/head"

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

  static loginButton() {
    let text
    let loginLogoutFn

    const notLoggedIn = false
    if (notLoggedIn) {
      text = "Login"
      loginLogoutFn = ""
    } else {
      text = "Logout"
    }

    return <Link href={loginLogoutFn}>{text}</Link>
  }

  render() {
    return (
      <div>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <header>
          <nav>
            <Link href="/">
              <a>Home</a>
            </Link>{" "}
            |
            {this.loginButton}
          </nav>
        </header>

        {this.props.children}

        <footer>
          Copyright 2018 Cole Inman
          <Link href={githubUrl}>GitHub</Link>
        </footer>
      </div>
    )
  }
}
