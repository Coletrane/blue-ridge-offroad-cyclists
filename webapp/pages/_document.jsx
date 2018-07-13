import React from "react"
import Document, { Head, Main, NextScript } from "next/document"

import "./_document.css"

class RIMBADocument extends Document {

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
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default RIMBADocument
