import React from "react"
import Document, { Head, Main, NextScript } from "next/document"
import styled, { ServerStyleSheet } from "styled-components"

export default class RIMBADocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Member login and management for members of the Roanoke chapter of the International Mountain Biking Association"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Exo+2:700|IBM+Plex+Mono"
            rel="stylesheet"
          />
          {this.props.styleTags}
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </html>
    )
  }
}

const Body = styled.body`
  margin: 0;
  background-color: black;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Exo 2", sans-serif;
  }

  p {
    font-family: "IBM Plex Mono", monospace;
  }
`
