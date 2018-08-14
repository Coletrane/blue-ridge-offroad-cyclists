import React from "react"
import DefaultLayout from "../components/layout/DefaultLayout"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import UserInfoForm from "../components/input/UserInfoForm"
import PasswordChangeForm from "../components/input/PasswordChangeForm"
import withLoginCheck from "../components/WithLoginCheck"

import styled from "styled-components"

import { viewActionTypes } from "../store/view"
import { updateUser, updatePassword } from "../store/user"
import {
  userProfileInputValid,
  passwordInputValid
} from "../util/user-info-helpers"
import {
  userInfoFormSubmit,
  passwordInfoFormSubmit,
  emitEventType
} from "../util/event-types"
import { cssFont, fonts } from "../util/styles"

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoFormOpen: false,
      passwordFormOpen: false
    }
  }

  openUserInfoForm = () => {
    this.setState({
      infoFormOpen: true,
      passwordFormOpen: false
    })
  }

  openPassowrdChangeForm = () => {
    this.setState({
      passwordFormOpen: true,
      infoFormOpen: false
    })
  }

  openVerificationCodeWindow = () => {
    this.props.dispatch({
      type: viewActionTypes.OPEN_VERIFICATION_CODE_WINDOW
    })
  }

  closeForms = () => {
    this.setState({
      infoFormOpen: false,
      passwordFormOpen: false
    })
  }

  saveUserInfo = event => {
    emitEventType(event, userInfoFormSubmit)
  }

  saveUserInfoCallback = state => {
    if (userProfileInputValid(state)) {
      this.props.dispatch(
        updateUser({
          user: state
        })
      )
      this.closeForms()
    }
  }

  updatePassword = event => {
    emitEventType(event, passwordInfoFormSubmit)
  }

  updatePasswordCallback = state => {
    if (passwordInputValid(state)) {
      this.props.dispatch(updatePassword(state))
    }
  }

  render() {
    return (
      <DefaultLayout>
        <MainContent>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <BROCPaper>
                <h2>Profile</h2>
                {!this.state.infoFormOpen &&
                  !this.state.passwordFormOpen && (
                    <div>
                      <UserInfoText>{this.props.store.user.name}</UserInfoText>
                      {!this.props.store.user.email_verified && (
                        <Button onClick={this.openVerificationCodeWindow}>
                          Click here to verify email
                        </Button>
                      )}
                      <EmailText
                        verified={this.props.store.user.email_verified}
                      >
                        {this.props.store.user.email}
                      </EmailText>

                      {!this.props.store.user.email_verified && (
                        <NotVerifiedText>*Not verified</NotVerifiedText>
                      )}
                      <UserInfoText>
                        {this.props.store.user.phone_number}
                      </UserInfoText>
                      <UserInfoText>
                        {this.props.store.user.address}
                      </UserInfoText>
                      <ActionButtons>
                        <Button onClick={this.openPassowrdChangeForm}>
                          Change Password
                        </Button>
                        <Button onClick={this.openUserInfoForm}>Edit</Button>
                      </ActionButtons>
                    </div>
                  )}
                {this.state.infoFormOpen && (
                  <form onSubmit={this.saveUserInfo}>
                    <UserInfoForm
                      onValidate={this.saveUserInfoCallback}
                      email={this.props.store.user.email}
                      phone={this.props.store.user.phone_number}
                      name={this.props.store.user.name}
                      fullAddress={this.props.store.user.address}
                      editing
                    />
                    <SubmitAndCancelButtons onCancel={this.closeForms} />
                  </form>
                )}
                {this.state.passwordFormOpen && (
                  <form onSubmit={this.updatePassword}>
                    <PasswordChangeForm
                      onValidate={this.updatePasswordCallback}
                    />
                    <SubmitAndCancelButtons onCancel={this.closeForms} />
                  </form>
                )}
              </BROCPaper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <BROCPaper>
                  <h2>Membership Status</h2>
                </BROCPaper>
              </Paper>
            </Grid>
          </Grid>
        </MainContent>
        <div />
      </DefaultLayout>
    )
  }
}

const SubmitAndCancelButtons = props => {
  return (
    <ActionButtons>
      <Button id="profile-edit-cancel-button" onClick={props.onCancel}>
        Cancel
      </Button>
      <Button
        id="profile-edit-submit-button"
        type="submit"
        variant="contained"
        color="primary"
      >
        Save
      </Button>
    </ActionButtons>
  )
}

const MainContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
`
const BROCPaper = styled(Paper)`
  padding: 0.5rem 1rem 1rem 1rem;
  h2 {
    margin-top: 0;
    margin-bottom: .5rem;
  }
`
const UserInfoText = styled.div`
  font-family: ${cssFont(fonts.IBMPlexMono)};
  font-size: 1rem;
  padding: 0.5rem 0;
`
const EmailText = styled(UserInfoText)`
  height: 2.6rem;
  float: ${props => (props.verified ? "" : "left")};
`
const NotVerifiedText = styled.span`
  float: right;
  color: red;
`

const ActionButtons = styled.div`
  padding-top: 1rem;
  button:last-child {
    float: right;
  }
`

export default withLoginCheck(Profile, true)
