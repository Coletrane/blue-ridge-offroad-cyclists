import React from "react"
import DefaultLayout from "../components/layout/DefaultLayout"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import UserInfoForm from "../components/input/UserInfoForm"
import PasswordChangeForm from "../components/input/PasswordChangeForm"
import withLoginCheck from "../components/WithLoginCheck"

import styled from "styled-components"

import { connect } from "react-redux"
import { viewActionTypes } from "../store/view"
import { updateUser } from "../store/user"
import { submitEvent, userProfileInputValid } from "../util/functions"

const mapStateToProps = state => ({
  user: state.user,
  view: state.view
})

const mapDispatchToProps = dispatch => ({
  openLoginWindow: payload =>
    dispatch({
      type: viewActionTypes.OPEN_LOGIN_WINDOW,
      payload: {
        ...payload
      }
    }),
  updateUser: user =>
    dispatch(
      updateUser({
        user: user
      })
    ),
  openVerificationCodeWindow: () => {
    dispatch({
      type: viewActionTypes.OPEN_VERIFICATION_CODE_WINDOW,
      payload: {
        cancellable: true
      }
    })
  }
})

// const mapDispatchToProps = dispatch
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoFormOpen: false,
      passwordFormOpen: false
    }
  }

  closeForm = () => {
    this.setState({
      infoFormOpen: false,
      passwordFormOpen: false
    })
  }

  openUserInfoForm = () => {
    this.setState({
      infoFormOpen: true,
      passwordFormOpen: false
    })
  }
  saveUserInfo = event => {
    submitEvent(event)
  }
  saveUserInfoCallback = state => {
    if (userProfileInputValid(state)) {
      this.props.updateUser(state)
    }
  }

  openPassowrdChangeForm = () => {
    this.setState({
      passwordFormOpen: true,
      infoFormOpen: false
    })
  }

  updatePassword = () => {}

  render() {
    return (
      <DefaultLayout>
        <MainContent>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Paper>
                <PaperContent>
                  {!this.state.infoFormOpen &&
                    !this.state.passwordFormOpen && (
                      <div>
                        <h2>{this.props.user.name}</h2>
                        {!this.props.user.email_verified && (
                          <Button
                            onClick={this.props.openVerificationCodeWindow}
                          >
                            Click here to verify email
                          </Button>
                        )}
                        <Grid container spacing={24}>
                          <Grid item xs={6}>
                            <h4>{this.props.user.email}</h4>
                          </Grid>
                          <Grid item xs={6}>
                            {!this.props.user.email_verified && (
                              <AlertText>*Not verified</AlertText>
                            )}
                          </Grid>
                        </Grid>
                        <h4>{this.props.user.phone_number}</h4>
                        <h4>{this.props.user.address}</h4>
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
                        email={this.props.user.email}
                        phone={this.props.user.phone_number}
                        name={this.props.user.name}
                        fullAddress={this.props.user.address}
                        editing
                      />
                      <SubmitAndCancelButtons onCancel={this.closeForm} />
                    </form>
                  )}
                  {this.state.passwordFormOpen && (
                    <form onSubmit={this.updatePassword}>
                      <PasswordChangeForm />
                      <SubmitAndCancelButtons onCancel={this.closeForm} />
                    </form>
                  )}
                </PaperContent>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper>
                <PaperContent>
                  <h2>Membership Status</h2>
                </PaperContent>
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
      <Button onClick={props.onCancel}>Cancel</Button>
      <Button type="submit" variant="contained" color="primary">
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
const PaperContent = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
`
const AlertText = styled.h6`
  color: red;
  float: right;
`
const ActionButtons = styled.div`
  padding-top: 1rem;
  button:last-child {
    float: right;
  }
`

export default withLoginCheck(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile),
  true
)
