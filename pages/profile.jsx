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
import { updateUser } from "../store/user"
import { submitEvent, userProfileInputValid } from "../util/user-info-helpers"

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
    submitEvent(event)
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

  updatePassword = () => {}
  updatePasswordCallback = state => {}

  render() {
    return (
      <DefaultLayout>
        <MainContent>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <BROCPaper>
                {!this.state.infoFormOpen &&
                  !this.state.passwordFormOpen && (
                    <div>
                      <h2>{this.props.store.user.name}</h2>
                      {!this.props.store.user.email_verified && (
                        <Button onClick={this.openVerificationCodeWindow}>
                          Click here to verify email
                        </Button>
                      )}
                      <EmailText
                        verified={this.props.store.user.email_verified}
                      >
                        <h4>{this.props.store.user.email}</h4>
                        {!this.props.store.user.email_verified && (
                          <h6>*Not verified</h6>
                        )}
                      </EmailText>
                      <h4>{this.props.store.user.phone_number}</h4>
                      <h4>{this.props.store.user.address}</h4>
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
                    <PasswordChangeForm />
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
  h2 {
    margin-top: 0;
  }
`
const BROCPaper = styled(Paper)`
  padding: 0.5rem 1rem 1rem 1rem;
`
const EmailText = styled.div`
  height: 2.6rem;
  h4 {
    float: ${props => (props.verified ? "" : "left")};
  }
  h6 {
    float: right;
    color: red;
  }
`
const ActionButtons = styled.div`
  padding-top: 1rem;
  button:last-child {
    float: right;
  }
`

export default withLoginCheck(Profile, true)
