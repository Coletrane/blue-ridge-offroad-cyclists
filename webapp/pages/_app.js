import App, {Container} from 'next/app'
import React from 'react'
import Amplify from 'aws-amplify'

Amplify.configure({
  userPoolId: 'us-east-1_X7spDXoVy',
  region: 'us-east-1',

})
export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return <Container>
      <Component {...pageProps} />
    </Container>
  }
}