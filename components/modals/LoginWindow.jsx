import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import withMobileDialog from "@material-ui/core/withMobileDialog"
import FacebookLogin from "react-facebook-login"
import UserInfoForm from "../input/UserInfoForm"
import Loader, {loaderTypes} from "../Loader"
import LinkButtonLeft from "./LinkButtonLeft"

import PropTypes from "prop-types"

import { connect } from "react-redux"
import { mapStateToProps } from "../../store/helpers"
import {
  register,
  login,
  registerWithFacebookCallback,
  authActionTypes
} from "../../store/auth"
import { viewActionTypes } from "../../store/view"

import { userProfileInputValid } from "../../util/user-info-helpers"
import { userInfoFormSubmit, emitEventType } from "../../util/event-types"

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
      this.props.dispatch({
        type: viewActionTypes.CLOSE_LOGIN_WINDOW,
        payload: {
          name: "",
          email: "",
          registering: false
        }
      })
    }
  }

  submit = event => {
    emitEventType(event, userInfoFormSubmit)
  }

  validateInputCallback = state => {
    if (
      this.props.store.view.loginWindow.registering &&
      userProfileInputValid(state) &&
      state.passwordValid
    ) {
      this.props.dispatch(
        register({
          email: state.email,
          password: state.password,
          name: state.name,
          address: `${state.address} ${state.city} ${
            state.state.abbreviation
          } ${state.zipCode}`,
          phone: state.phone
        })
      )
    } else if (
      !this.props.store.view.loginWindow.registering &&
      state.emailValid &&
      state.passwordValid
    ) {
      this.props.dispatch(login(state.email, state.password))
    }
  }

  get title() {
    if (this.state.forgotPassword) {
      return "Recover Password"
    } else if (this.props.store.view.loginWindow.registering) {
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

  registerWithFacebook = () => {
    this.props.dispatch({
      type: authActionTypes.REGISTER
    })
  }

  registerWithFacebookCallback = fbRes => {
    this.props.dispatch(registerWithFacebookCallback(fbRes))
  }

  render() {
    return (
      <Dialog
        id="login-window"
        open={this.props.store.view.loginWindow.open}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">{this.title}</DialogTitle>
        <Loader loading={this.props.store.auth.loading} type={loaderTypes.modal}>
          <form onSubmit={this.submit}>
            <DialogContent>
              {this.props.store.view.loginWindow.registering && (
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
                registering={this.props.store.view.loginWindow.registering}
                forgotPassword={this.state.forgotPassword}
              />
            </DialogContent>
            <DialogActions>
              {!this.props.store.view.loginWindow.registering && (
                <LinkButtonLeft
                  id="forgot-password-button"
                  onClick={this.forgotPassword}
                >
                  Forgot Password?
                </LinkButtonLeft>
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
          </form>
        </Loader>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps)(withMobileDialog()(LoginWindow))
