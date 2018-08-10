import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import withMobileDialog from "@material-ui/core/withMobileDialog"
import FacebookLogin from "react-facebook-login"
import UserInfoForm from "../input/UserInfoForm"
import ModalLoader, { DialogContentWrapper } from "./ModalLoader"

import PropTypes from "prop-types"
import styled from "styled-components"

import { connect } from "react-redux"
import {
  register,
  login,
  registerWithFacebookCallback,
  authActionTypes
} from "../../store/auth"
import { viewActionTypes } from "../../store/view"

import { submitEvent, userProfileInputValid } from "../../util/functions"

const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view
})

const mapDispatchToProps = dispatch => ({
  register: user => {
    dispatch(register(user))
  },
  login: (email, password) => {
    dispatch(login(email, password))
  },
  closeLoginWindow: () => {
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW,
      payload: {
        name: "",
        email: "",
        registering: false
      }
    })
  },
  registerWithFacebook: () => {
    dispatch({
      type: authActionTypes.REGISTER
    })
  },
  registerWithFacebookCallback: fbRes => {
    dispatch(registerWithFacebookCallback(fbRes))
  }
})

class LoginWindow extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    name: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      forgotPassword: false
    }
  }

  cancel = () => {
    if (this.state.forgotPassword) {
      this.setState({
        forgotPassword: false
      })
    } else {
      this.props.closeLoginWindow()
    }
  }

  submit = event => {
    submitEvent(event)
  }

  validateInputCallback = state => {
    if (
      this.props.view.loginWindow.registering &&
      userProfileInputValid(state) &&
      state.passwordValid
    ) {
      this.props.register({
        email: state.email,
        password: state.password,
        name: state.name,
        address: `${state.address} ${state.city} ${state.state.abbreviation} ${
          state.zipCode
        }`,
        phone: state.phone
      })
    } else if (
      !this.props.view.loginWindow.registering &&
      state.emailValid &&
      state.passwordValid
    ) {
      this.props.login(state.email, state.password)
    }
  }

  get title() {
    if (this.state.forgotPassword) {
      return "Recover Password"
    } else if (this.props.view.loginWindow.registering) {
      return "Register"
    } else {
      return "Login"
    }
  }

  forgotPassword = () => {
    this.setState({
      forgotPassword: true
    })
  }

  render() {
    return (
      <Dialog
        id="login-window"
        open={this.props.view.loginWindow.open}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">{this.title}</DialogTitle>
        <ModalLoader loading={this.props.auth.loading} />
        <form onSubmit={this.submit}>
          <DialogContentWrapper loading={this.props.auth.loading}>
            <DialogContent>
              {this.props.view.loginWindow.registering && (
                <FacebookLogin
                  appId="434306560403731"
                  fields="name,email"
                  onClick={this.props.registerWithFacebook}
                  callback={this.props.registerWithFacebookCallback}
                  textButton="Register with Facebook"
                />
              )}
              <UserInfoForm
                onValidate={this.validateInputCallback}
                email={this.props.email}
                name={this.props.name}
                registering={this.props.view.loginWindow.registering}
                forgotPassword={this.state.forgotPassword}
              />
            </DialogContent>
            <DialogActions>
              {!this.props.view.loginWindow.registering && (
                <LeftLinkButton>
                  <Button onClick={this.forgotPassword}>
                    Forgot Password?
                  </Button>
                </LeftLinkButton>
              )}
              <Button id="login-window-cancel" onClick={this.cancel}>
                Cancel
              </Button>
              <Button
                id="login-window-submit"
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </DialogContentWrapper>
        </form>
      </Dialog>
    )
  }
}

const LeftLinkButton = styled.div`
  margin-right: auto !important;
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMobileDialog()(LoginWindow))
