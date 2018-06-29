import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import withMobileDialog from '@material-ui/core/withMobileDialog';

import styled from "styled-components"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { authActionTypes } from "../store/auth"
import { viewActionTypes } from "../store/view"

const mapStateToProps = state => ({
  ...state.auth,
  ...state.view
})

const mapDispatchToProps = dispatch => ({
  register: () =>
    dispatch({
      type: authActionTypes.REGISTER
    }),
  login: () =>
    dispatch({
      type: authActionTypes.LOGIN
    }),
  closeLoginWindow: () =>
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW
    })
})

class LoginWindow extends React.Component {
  static propTypes = {
    registering: PropTypes.bool.isRequired
  }

  cancel() {
    this.props.closeLoginWindow()
  }
  submit() {

    this.props.closeLoginWindow()
  }

  get title() {
    if (this.props.isRegistering) {
      return "Register"
    } else {
      return "Login"
    }
  }
  get form() {
    if (this.props.registering) {
      return (
        <div>
          <DialogContentText />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </div>
      )
    }
  }
  render() {
    return (
      <Dialog open={this.props.loginWindowOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{this.title}</DialogTitle>
        <DialogContent>{this.form}</DialogContent>
        <DialogActions>
          <Button onClick={() => this.cancel()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.submit()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMobileDialog()(LoginWindow))
