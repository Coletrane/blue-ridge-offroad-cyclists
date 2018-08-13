import React from "react"
import TextField from "@material-ui/core/TextField"
import NativeSelect from "@material-ui/core/NativeSelect"
import InputAdornment from "@material-ui/core/InputAdornment"
import BROCPopover from "../modals/BROCPopover"

import styled from "styled-components"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { mapStateToProps } from "../../store/helpers"
import { viewActionTypes, passwordPopoverMessages } from "../../store/view"

import usStates from "../../util/state-codes.json"
import { userInfoFormSubmit } from "../../util/event-types"
import { validPassword, splitAddress } from "../../util/user-info-helpers"
import isEmail from "validator/lib/isEmail"
import isPostalCode from "validator/lib/isPostalCode"
import isMobilePhone from "validator/lib/isMobilePhone"

class UserInfoForm extends React.Component {
  static propTypes = {
    onValidate: PropTypes.func,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    fullAddress: PropTypes.string,
    registering: PropTypes.bool,
    editing: PropTypes.bool,
    forgotPassword: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      email: this.props.email || "",
      emailValid: false,
      password: "",
      passwordValid: false,
      phone: this.props.phone ? this.props.phone.replace("+1", "") : "",
      phoneValid: false,
      name: this.props.name || "",
      nameValid: false,
      address: this.props.fullAddress
        ? splitAddress(this.props.fullAddress).address
        : "",
      addressValid: false,
      city: this.props.fullAddress
        ? splitAddress(this.props.fullAddress).city
        : "",
      cityValid: false,
      state: usStates.find(state => {
        let searchAbbrev
        if (this.props.fullAddress) {
          searchAbbrev = splitAddress(this.props.fullAddress).state
        } else {
          searchAbbrev = "VA"
        }
        return state.abbreviation === searchAbbrev
      }),
      stateValid: false,
      zipCode: this.props.fullAddress
        ? splitAddress(this.props.fullAddress).zipCode
        : "",
      zipCodeValid: false,
      formSubmitted: false,
      passwordFocused: false
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

  openPopover = () => {
    this.props.dispatch({
      type: viewActionTypes.OPEN_POPOVER,
      payload: {
        message: passwordPopoverMessages.requirements
      }
    })
  }

  validateInput = () => {
    const newState = {
      emailValid: isEmail(this.state.email || " "),
      passwordValid: validPassword(this.state.password),
      phoneValid: isMobilePhone(this.state.phone || " ", "en-US"),
      nameValid: this.state.name.split(" ").length > 1,
      addressValid: this.state.address ? true : false,
      cityValid: this.state.city ? true : false,
      zipCodeValid: isPostalCode(this.state.zipCode || " ", "US")
    }

    // This is so we can pass +1 in front of the phone number
    // without upsetting react about a controlled input
    const onValidateState = {
      ...this.state,
      ...newState
    }
    if (this.state.phone && !this.state.phone.startsWith("+1")) {
      onValidateState.phone = `+1${this.state.phone}`
    }

    newState.formSubmitted = true

    this.setState(newState, () => {
      if (this.props.onValidate) {
        this.props.onValidate(onValidateState)
      }
    })
  }

  // componentDidUpdate() {
  //   const newState = {}
  //   if (this.props.email && this.props.email !== this.state.email) {
  //     newState.email = this.props.email
  //   }
  //   if (this.props.name && this.props.name !== this.state.name) {
  //     newState.name = this.props.name
  //   }
  //   if (newState.email || newState.name) {
  //     this.setState(newState)
  //   }
  // }

  render() {
    return (
      <BROCUserInfoForm fullWidth={this.props.forgotPassword}>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          error={this.state.formSubmitted && !this.state.emailValid}
          value={this.state.email}
          onChange={this.handleBasicInput}
        />
        {(this.props.registering || this.props.editing) && (
          <div>
            <TextField
              margin="dense"
              id="phone"
              label="Phone"
              type="text"
              fullWidth
              error={this.state.formSubmitted && !this.state.phoneValid}
              value={this.state.phone}
              onChange={this.handleBasicInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+1</InputAdornment>
                )
              }}
            />
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              error={this.state.formSubmitted && !this.state.nameValid}
              value={this.state.name}
              onChange={this.handleBasicInput}
            />
            <TextField
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              error={this.state.formSubmitted && !this.state.addressValid}
              value={this.state.address}
              onChange={this.handleBasicInput}
            />
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="text"
              error={this.state.formSubmitted && !this.state.cityValid}
              value={this.state.city}
              onChange={this.handleBasicInput}
            />
            <StateSelect>
              <NativeSelect
                margin="dense"
                value={this.state.state.name}
                id="state"
                label="State"
                onChange={this.handleBasicInput}
              >
                {usStates.map((state, i) => {
                  return (
                    <option key={i} value={state.name}>
                      {state.name}
                    </option>
                  )
                })}
              </NativeSelect>
            </StateSelect>
            <TextField
              margin="dense"
              id="zipCode"
              label="Zip Code"
              type="text"
              error={this.state.formSubmitted && !this.state.zipCodeValid}
              value={this.state.zipCode}
              onChange={this.handleBasicInput}
            />
          </div>
        )}
        {!this.props.forgotPassword &&
          !this.props.editing && (
            <div ref={this.passwordRef}>
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                error={this.state.formSubmitted && !this.state.passwordValid}
                value={this.state.password}
                onChange={this.handleBasicInput}
                onFocus={this.openPopover}
              />
              {this.props.registering && (
                <BROCPopover anchorEl={this.passwordRef.current} />
              )}
            </div>
          )}
      </BROCUserInfoForm>
    )
  }
}

const BROCUserInfoForm = styled.div`
  width: ${props => (props.fullWidth ? "26rem" : "")};
`
const StateSelect = styled.span`
  div {
    width: 8.75rem;
  }
  select {
    padding-bottom: 6px;
  }
`

export default connect(mapStateToProps)(UserInfoForm)
