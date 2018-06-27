import App, { Container } from "next/app"
import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <CssBaseline/>
        <Component {...pageProps} />
      </Container>
    )
  }
}
