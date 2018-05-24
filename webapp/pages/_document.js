import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'

export default class RIMBADocument extends Document {
  render () {
    return (
      <html lang="en">
        <Head>
          <title>
            RIMBA Member Manager
          </title>
            <meta charSet="utf-8"/>
            <meta name="viewport"
                  content="initial-scale=1.0, width=device-width"/>
            <meta name="description"
                  content="Member login and management for board members of the Roanoke chapter of the International Mountain Biking Association"/>
        </Head>

        <body style={globalStyles}>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}

const globalStyles = {
  margin: '0',
  backgroundColor: 'black'
}