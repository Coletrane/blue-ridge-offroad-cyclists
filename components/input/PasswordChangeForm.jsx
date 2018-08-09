import React from "react"
import TextField from "@material-ui/core/TextField"
import BROCPopover from "../modals/BROCPopover"
import UserInfoForm from "./UserInfoForm"

import styled from "styled-components"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { viewActionTypes, passwordPopoverMessages } from "../../store/view"
import { userInfoFormSubmit } from "../../util/event-types"

import { validPassword } from "../../util/functions"
// TODO: make an abstract component for this and USERInfoForm?
const mapStateToProps = state => ({
  view: state.view
})

const mapDispatchToProps = dispatch => ({
  openPopover: () => {
    dispatch({
      type: viewActionTypes.OPEN_POPOVER,
      payload: {
        message: passwordPopoverMessages.noMatch
      }
    })
  }
})

class PasswordChangeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: "",
      oldPasswordValid: false,
      newPassword: "",
      newPasswordValid: false,
      newPasswordConfirm: "",
      newPasswordConfirmValid: false,
      newPasswordFocused: false,
      newPasswordsMatch: false
    }
    this.passwordRef = React.createRef()
  }

  componentDidMount() {
    if (process.browser) {
      document.addEventListener(userInfoFormSubmit, this.validateInput)
    }
  }

  componentWillUnmount() {
    if (process.browser) {
      document.removeEventListener(userInfoFormSubmit, this.validateInput)
    }
  }

  handleBasicInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  validateInput = () => {
    const newState = {
      oldPasswordValid: validPassword(this.state.password),
      newPasswordValid: validPassword(this.state.newPassword),
      newPasswordConfirmValid: validPassword(this.state.newPasswordConfirm),
      newPasswordsMatch:
        this.state.newPassword === this.state.newPasswordConfirm
    }
    if (!newState.newPasswordsMatch) {
      this.openPopover()
    }

    this.setState(newState)
  }

  render() {
    return (
      <div ref={this.passwordRef}>
        <TextField
          margin="dense"
          id="oldPassword"
          label="Old Password"
          type="password"
          fullWidth
          error={this.state.formSubmitted && !this.state.passwordValid}
          value={this.state.oldPassword}
          onChange={this.handleBasicInput}
        />
        <TextField
          margin="dense"
          id="newPassword"
          label="New Password"
          type="password"
          fullWidth
          error={this.state.formSubmitted && !this.state.passwordValid}
          value={this.state.newPassword}
          onChange={this.handleBasicInput}
        />
        <TextField
          margin="dense"
          id="newPasswordConfirm"
          label="Confirm New Password"
          type="password"
          fullWidth
          error={this.state.formSubmitted && !this.state.passwordValid}
          value={this.state.newPasswordConfirm}
          onChange={this.handleBasicInput}
        />
        <BROCPopover anchorEl={this.passwordRef} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChangeForm)
