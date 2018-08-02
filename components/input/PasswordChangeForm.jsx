import React from "react"
import TextField from "@material-ui/core/TextField"
import RIMBAPopover from "../layout/RIMBAPopover"

import { connect } from "react-redux"
import { viewActionTypes, passwordPopoverMessages } from "../../store/view"
import { userInfoFormSubmit } from "../../util/event-types"

import { validPassword, getFormFieldsState } from "../../util/functions"
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
      ...getFormFieldsState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
      }),
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
      oldPassword: {
        valid: validPassword(this.state.password)
      },
      newPassword: {
        valid: validPassword(this.state.newPassword)
      },
      newPasswordConfirm: {
        valid: validPassword(this.state.newPasswordConfirm)
      },
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
          error={this.state.formSubmitted && !this.state.oldPassword.valid}
          value={this.state.oldPassword.value}
          onChange={this.handleBasicInput}
        />
        <TextField
          margin="dense"
          id="newPassword"
          label="New Password"
          type="password"
          fullWidth
          error={this.state.formSubmitted && !this.state.newPassword.valid}
          value={this.state.newPassword.value}
          onChange={this.handleBasicInput}
        />
        <TextField
          margin="dense"
          id="newPasswordConfirm"
          label="Confirm New Password"
          type="password"
          fullWidth
          error={
            this.state.formSubmitted && !this.state.newPasswordConfirm.valid
          }
          value={this.state.newPasswordConfirm.value}
          onChange={this.handleBasicInput}
        />
        <RIMBAPopover anchorEl={this.passwordRef} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChangeForm)
