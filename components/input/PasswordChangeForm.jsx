import React from "react"
import TextField from "@material-ui/core/TextField"
import PasswordPopover from "./PasswordPopover"

import styled from "styled-components"
import PropTypes from "prop-types"
import UserInfoForm from "./UserInfoForm"

class PasswordChangeForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      oldPassword: "",
      oldPasswordValid: false,
      newPassword: "",
      newPasswordValid: false,
      newPasswordFocused: false,
      newPasswordConfirm: "",
      newPasswordConfirmValid: false,
      newPasswordsMatch: false
    }
  }

  validateInput = () => {
    const newState = {
      oldPasswordValid: UserInfoForm.validPassword(this.state.password),
      newPasswordValid: UserInfoForm.validPassword(this.state.newPassword),
      newPasswordConfirmValid: UserInfoForm.validPassword(
        this.state.newPasswordConfirm
      ),
      newPasswordsMatch:
      this.state.newPassword === this.state.newPasswordConfirm,
    }
  }

  newPasswordFocused = () => {
    this.setState({
      newPasswordFocused: true
    })
  }
  newPasswordBlur = () => {
    this.setState({
      newPasswordFocused: false
    })
  }

  render() {
    return (
      <div>
        <TextField
          margin="dense"
          id="old-password"
          label="Old Password"
          type="password"
          fullWidth
          error={this.state.formSubmitted && !this.state.passwordValid}
          value={this.state.oldPassword}
          onChange={this.handleBasicInput}
        />
        <PasswordPopover focused={}/>
        <TextField
          margin="dense"
          id="old-password"
          label="Old Password"
          type="password"
          fullWidth
          error={this.state.formSubmitted && !this.state.passwordValid}
          value={this.state.oldPassword}
          onChange={this.handleBasicInput}
          onFocus={this.newPasswordFocused}
          onBlur={this.newPasswordBlur}
        />
      </div>
    )
  }
}