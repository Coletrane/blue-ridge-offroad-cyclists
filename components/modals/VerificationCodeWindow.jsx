import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import Loader from "../Loader"
import withMobileDialog from "@material-ui/core/withMobileDialog"
import LinkButtonLeft from "./LinkButtonLeft"

import PropTypes from "prop-types"
import styled from "styled-components"

import { connect } from "react-redux"
import { mapStateToProps } from "../../store/helpers"
import { viewActionTypes } from "../../store/view"
import { resendCode, verifyCode } from "../../store/user"

class VerificationCodeWindow extends React.Component {
  static propTypes = {
    cancellable: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      verificationCode: ""
    }
  }

  handleBasicInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  submit = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.dispatch(
      verifyCode({
        code: this.state.verificationCode
      })
    )
  }

  closeVerificationCodeWindow = () => {
    this.props.dispatch({
      type: viewActionTypes.CLOSE_VERIFICATION_CODE_WIDNOW
    })
  }

  resendCode = () => {
    this.props.dispatch(resendCode())
  }

  render() {
    return (
      <Dialog
        open={this.props.store.view.verificationCodeWindow.open}
        aria-labelledby="verification-code-dialog-title"
      >
        <DialogTitle id="verification-code-dialog-title">
          Enter Verification Code
        </DialogTitle>
        <Loader loading={this.props.store.user.loading}>
          <form onSubmit={this.submit}>
            <DialogContent>
              <TextField
                margin="dense"
                id="verificationCode"
                label="Verification Code"
                onChange={this.handleBasicInput}
                value={this.state.verificationCode}
              />
            </DialogContent>
            <DialogActions>
              {this.props.store.view.verificationCodeWindow.cancellable && (
                <LinkButtonLeft onClick={this.closeVerificationCodeWindow}>
                  Cancel
                </LinkButtonLeft>
              )}
              <Button onClick={this.resendCode}>Resend code</Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Loader>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps)(
  withMobileDialog()(VerificationCodeWindow)
)
