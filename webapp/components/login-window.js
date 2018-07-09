import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import withMobileDialog from "@material-ui/core/withMobileDialog"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

import styled from "styled-components"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { authActionTypes } from "../store/auth"
import { viewActionTypes } from "../store/view"

import usStates from "../src/util/state-codes.json"

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

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: "",
      address: "",
      city: "",
      state: usStates[0],
      zipCode: -1
    }
  }

  cancel() {
    this.props.closeLoginWindow()
  }
  submit() {
    this.props.closeLoginWindow()
  }

  get title() {
    if (this.props.registering) {
      return "Register"
    } else {
      return "Login"
    }
  }

  render() {
    let form = [
      <TextField
        key={0}
        autoFocus
        margin="dense"
        id="email"
        label="Email Address"
        type="email"
        fullWidth
      />
    ]

    if (this.props.registering) {
      form.push(
        <TextField
          key={1}
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
        />
      )

      form.push(
        <TextField
          key={form.length}
          margin="dense"
          id="address"
          label="Address"
          type="text"
          fullWidth
        />
      )
      form.push(
        <TextField
          key={form.length}
          margin="dense"
          id="city"
          label="City"
          type="text"
        />
      )

      form.push(
        <Select
          key={form.length}
          value={this.state.state.abbreviation}
          onChange={event => {
            this.setState({
              state: usStates.find(
                state => state.abbreviation === event.target.value
              )
            })
          }}
          id="state"
          label="State"
        >
          {usStates.map((state, i) => {
            return (
              <MenuItem key={i} value={state.abbreviation}>
                {state.abbreviation}
              </MenuItem>
            )
          })}
        </Select>
      )
    }

    return (
      <Dialog
        open={this.props.loginWindowOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{this.title}</DialogTitle>
        <DialogContent>
          <DialogContentText />
          {form}
          <TextField
            key={form.length}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
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
