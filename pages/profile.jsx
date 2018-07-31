import React from "react"
import DefaultLayout from "../components/layout/DefaultLayout"
import withLoginCheck from "../components/WithLoginCheck"

import styled from "styled-components"

import { connect } from "react-redux"
import { viewActionTypes } from "../store/view"

const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view
})

const mapDispatchToProps = dispatch => ({
  openLoginWindow: payload =>
    dispatch({
      type: viewActionTypes.OPEN_LOGIN_WINDOW,
      payload: {
        ...payload
      }
    })
})

// const mapDispatchToProps = dispatch
class Profile extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <MainContent>
          <h2>{this.props.auth.name}</h2>
          <h4>{this.props.auth.email}</h4>
          <h4>{this.props.auth.phone}</h4>
          <h4>{this.props.auth.address}</h4>
        </MainContent>
        <div />
      </DefaultLayout>
    )
  }
}

const MainContent = styled.div`
  padding: 2rem;
`

export default withLoginCheck(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile),
  true
)
