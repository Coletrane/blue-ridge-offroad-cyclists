import React from "react"
import TextField from "@material-ui/core/TextField"
import PasswordRequirements from "./PasswordRequirements"

import styled from "styled-components"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { mapStateToProps } from "../../store/helpers"
import { passwordInfoFormSubmit } from "../../util/event-types"
import { passwordMessages } from "../../store/view"
import {
  validPassword,
  passwordInputValid,
  openPasswordReqsNotification
} from "../../util/user-info-helpers"
// TODO: make an abstract component for this and USERInfoForm?

class PasswordChangeForm extends React.Component {
  static propTypes = {
    onValidate: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      oldPassword: "",
      oldPasswordValid: false,
      newPassword: "",
      newPasswordValid: false,
      newPasswordConfirm: "",
      newPasswordConfirmValid: false,
      formSubmitted: false
    }
    this.validateInput = this.validateInput.bind(this)
  }

  componentDidMount() {
    if (process.browser) {
      document.addEventListener(passwordInfoFormSubmit, this.validateInput)
    }
  }

  componentWillUnmount() {
    if (process.browser) {
      document.removeEventListener(passwordInfoFormSubmit, this.validateInput)
    }
  }

  handleBasicInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  validateInput = () => {
    const newState = {
      oldPasswordValid: validPassword(this.state.oldPassword),
      newPasswordValid: validPassword(this.state.newPassword),
      newPasswordConfirmValid: validPassword(this.state.newPasswordConfirm),
      formSubmitted: true
    }
    if (this.state.newPassword !== this.state.newPasswordConfirm) {
      openPasswordReqsNotification(this.props.dispatch)
    }
    if (!validPassword(this.state.newPassword)) {
      openPasswordReqsNotification(this.props.dispatch)
    }

    this.setState(newState, () => {
      if (passwordInputValid(newState)) {
        this.props.onValidate(newState)
      }
    })
  }

  render() {
    return (
      <div>
        <TextField
          margin="dense"
          id="oldPassword"
          label="Old Password"
          type="password"
          fullWidth
          error={this.state.formSubmitted && !this.state.oldPasswordValid}
          value={this.state.oldPassword}
          autoFocus={true}
          onChange={this.handleBasicInput}
        />
        <TextField
          margin="dense"
          id="newPassword"
          label="New Password"
          type="password"
          fullWidth
          error={this.state.formSubmitted && !this.state.newPasswordValid}
          value={this.state.newPassword}
          onChange={this.handleBasicInput}
        />
        <TextField
          margin="dense"
          id="newPasswordConfirm"
          label="Confirm New Password"
          type="password"
          fullWidth
          error={
            this.state.formSubmitted && !this.state.newPasswordConfirmValid
          }
          value={this.state.newPasswordConfirm}
          onChange={this.handleBasicInput}
        />
        <PasswordRequirements/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PasswordChangeForm)
