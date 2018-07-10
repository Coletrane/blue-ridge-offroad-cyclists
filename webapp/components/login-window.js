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
import { registerAction } from "../store/auth"
import { viewActionTypes } from "../store/view"

import usStates from "../src/util/state-codes.json"

import isEmail from "validator/lib/isEmail"
import isPostalCode from "validator/lib/isPostalCode"

const mapStateToProps = state => ({
  ...state.auth,
  ...state.view
})

const mapDispatchToProps = dispatch => ({
  register: user => {
    dispatch(registerAction(user))
  },
  closeLoginWindow: () => {
    dispatch({
      type: viewActionTypes.CLOSE_LOGIN_WINDOW
    })
  }
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
      zipCode: ""
    }
  }

  cancel() {
    this.props.closeLoginWindow()
  }

  updateErrors(callback) {
    const newState = {
      emailError: !isEmail(this.state.email || ' '),
      passwordError: this.state.password.length < 8, // TODO: regex
      nameError: this.state.name.split(" ").length < 2,
      addressError: !this.state.address,
      cityError: !this.state.city,
      zipCodeError: !isPostalCode(this.state.zipCode || ' ', "US")
    }

    this.setState(newState, callback)
  }

  submit() {
    this.updateErrors(() => {
      if (
        this.props.registering &&
        !this.state.emailError &&
        !this.state.passwordError &&
        !this.state.nameError &&
        !this.state.addressError &&
        !this.state.zipCodeError
      ) {
        this.props.register({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          address: `${this.state.address} ${this.state.city} ${
            this.state.state.abbreviation
            } ${this.state.zipCode}`
        })
      }
    })
  }

  get title() {
    if (this.props.registering) {
      return "Register"
    } else {
      return "Login"
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.loginWindowOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{this.title}</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            error={this.state.emailError}
            onChange={event => {
              this.setState({
                email: event.target.value
              })
            }}
          />
          {(() => {
            if (this.props.registering) {
              return (
                <div>
                  <TextField
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    error={this.state.nameError}
                    onChange={event => {
                      this.setState({
                        name: event.target.value
                      })
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    error={this.state.addressError}
                    onChange={event => {
                      this.setState({
                        address: event.target.value
                      })
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="city"
                    label="City"
                    type="text"
                    error={this.state.cityError}
                    onChange={event => {
                      this.setState({
                        city: event.target.value
                      })
                    }}
                  />
                  <Select
                    value={this.state.state.abbreviation}
                    id="state"
                    label="State"
                    onChange={event => {
                      this.setState({
                        state: usStates.find(
                          state => state.abbreviation === event.target.value
                        )
                      })
                    }}
                  >
                    {usStates.map((state, i) => {
                      return (
                        <MenuItem key={i} value={state.abbreviation}>
                          {state.abbreviation}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  <TextField
                    margin="dense"
                    id="zipCode"
                    label="Zip Code"
                    type="text"
                    error={this.state.zipCodeError}
                    onChange={event => {
                      this.setState({
                        zipCode: event.target.value
                      })
                    }}
                  />
                </div>
              )
            }
          })()}
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            error={this.state.passwordError}
            onChange={event => {
              this.setState({
                password: event.target.value
              })
            }}
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
