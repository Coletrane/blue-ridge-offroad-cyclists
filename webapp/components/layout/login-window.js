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

import PropTypes from "prop-types"

import { connect } from "react-redux"
import { register, confirmRegister } from "../../store/auth"
import { viewActionTypes } from "../../store/view"

import usStates from "../../src/util/state-codes.json"

import isEmail from "validator/lib/isEmail"
import isPostalCode from "validator/lib/isPostalCode"
import isMobilePhone from "validator/lib/isMobilePhone"

const mapStateToProps = state => ({
  ...state.auth,
  ...state.view
})

const mapDispatchToProps = dispatch => ({
  register: user => {
    dispatch(register(user))
  },
  confirmRegister: (email, code) => {
    dispatch(confirmRegister(email, code))
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
      emailValid: false,
      password: "",
      passwordValid: false,
      phone: "",
      phoneValid: false,
      name: "",
      nameValid: false,
      address: "",
      addressValid: false,
      city: "",
      cityValid: false,
      state: usStates[0],
      zipCode: "",
      zipCodeValid: false,
      formSubmitted: false,
      confirmingCode: false,
      verificationCode: "",
      verificationCodeValid: false,
      typedState: ""
    }
  }

  cancel() {
    if (this.state.confirmingCode) {
      this.setState({
        confirmingCode: false,
        verificationCode: ""
      })
    } else {
      this.props.closeLoginWindow()
    }
  }

  validateInput(callback) {
    const specialCharacters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    const newState = {
      emailValid: isEmail(this.state.email || " "),
      passwordValid:
        this.state.password.length >= 8 &&
        specialCharacters.test(this.state.password),
      phoneValid: isMobilePhone(this.state.phone || " ", "en-US"),
      nameValid: this.state.name.split(" ").length > 1,
      addressValid: this.state.address,
      cityValid: this.state.city,
      zipCodeValid: isPostalCode(this.state.zipCode || " ", "US"),
      verificationCodeValid:
        !isNaN(parseInt(this.state.verificationCode)) &&
        this.state.verificationCode.length === 6
    }

    if (this.state.confirmingCode) {
      newState.verificationCodeSubmitted = true
    } else {
      newState.formSubmitted = true
    }

    this.setState(newState, callback)
  }

  submit() {
    this.validateInput(() => {
      if (
        this.props.registering &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.nameValid &&
        this.state.addressValid &&
        this.state.zipCodeValid
      ) {
        this.props.register({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          address: `${this.state.address} ${this.state.city} ${
            this.state.state.abbreviation
          } ${this.state.zipCode}`
        })
      } else if (
        this.state.confirmingCode &&
        this.state.verificationCodeValid
      ) {
        this.props.confirmRegister({
          email: this.state.email,
          code: this.state.verificationCode
        })
      }
    })
  }

  openAuthCodeDialog() {
    this.setState({
      confirmingCode: true
    })
  }

  get title() {
    if (this.state.confirmingCode) {
      return "Enter Verification Code"
    } else if (this.props.registering) {
      return "Register"
    } else {
      return "Login"
    }
  }

  // TODO: get this working
  typeState(event) {
    this.setState({
      typeState: event.target.value
    })
  }
  tearDownTypeState() {
    this.setState({
      typeState: ""
    })
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
            error={this.state.formSubmitted && !this.state.emailValid}
            onChange={event => {
              this.setState({
                email: event.target.value
              })
            }}
          />
          {(() => {
            if (this.props.registering && !this.state.confirmingCode) {
              return (
                <div>
                  <TextField
                    margin="dense"
                    id="phone"
                    label="Phone"
                    type="text"
                    fullWidth
                    error={this.state.formSubmitted && !this.state.phoneValid}
                    onChange={event => {
                      this.setState({
                        phone: event.target.value
                      })
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    error={this.state.formSubmitted && !this.state.nameValid}
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
                    error={this.state.formSubmitted && !this.state.addressValid}
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
                    error={this.state.formSubmitted && !this.state.cityValid}
                    onChange={event => {
                      this.setState({
                        city: event.target.value
                      })
                    }}
                  />
                  <Select
                    value={this.state.state.abbreviation}
                    autoWidth
                    id="state"
                    label="State"
                    onKeyUp={event => this.typeState(event)}
                    onBlur={() => this.tearDownTypeState()}
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
                    error={this.state.formSubmitted && !this.state.zipCodeValid}
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
          {(() => {
            if (this.state.confirmingCode) {
              return (
                <TextField
                  id="verificationCode"
                  label="Verification Code"
                  type="text"
                  style={{ margin: "auto" }}
                  error={
                    this.state.verificationCodeSubmitted &&
                    !this.state.verificationCodeValid
                  }
                  onChange={event => {
                    this.setState({
                      verificationCode: event.target.value
                    })
                  }}
                />
              )
            } else {
              return (
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  error={this.state.formSubmitted && !this.state.passwordValid}
                  onChange={event => {
                    this.setState({
                      password: event.target.value
                    })
                  }}
                />
              )
            }
          })()}
        </DialogContent>
        <DialogActions>
          ]
          <Button
            onClick={() => this.openAuthCodeDialog()}
            style={{ marginRight: "auto" }}
          >
            Have an authorization code?
          </Button>
          <Button onClick={() => this.cancel()}>Cancel</Button>
          <Button
            onClick={() => this.submit()}
            variant="contained"
            color="primary"
          >
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
