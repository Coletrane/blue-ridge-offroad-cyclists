import React from "react"
import TextField from "@material-ui/core/TextField"
import NativeSelect from "@material-ui/core/NativeSelect"
import InputAdornment from "@material-ui/core/InputAdornment"
import RIMBAPopover from "../layout/RIMBAPopover"

import styled from "styled-components"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import { viewActionTypes, passwordPopoverMessages } from "../../store/view"

import usStates from "../../util/state-codes.json"
import { userInfoFormSubmit } from "../../util/event-types"
import {
  validPassword,
  getFormFieldsState,
  splitAddress
} from "../../util/functions"
import isEmail from "validator/lib/isEmail"
import isPostalCode from "validator/lib/isPostalCode"
import isMobilePhone from "validator/lib/isMobilePhone"

const mapStateToProps = state => ({
  view: state.view
})

const mapDispatchToProps = dispatch => ({
  openPopover: () => {
    dispatch({
      type: viewActionTypes.OPEN_POPOVER,
      payload: {
        message: passwordPopoverMessages.requirements
      }
    })
  }
})

class UserInfoForm extends React.Component {
  static propTypes = {
    onValidate: PropTypes.func,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.number,
    fullAddress: PropTypes.string,
    registering: PropTypes.bool,
    editing: PropTypes.bool,
    forgotPassword: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      ...getFormFieldsState({
        email: this.props.email,
        password: "",
        phone: (() => {
          if (
            this.props.phone &&
            this.props.phone.length === 10 &&
            this.props.phone.startsWith(1)
          ) {
            return this.props.phone.slice(1)
          } else {
            return this.props.phone
          }
        })(),
        name: this.props.name,
        address: this.props.fullAddress
          ? splitAddress(this.props.fullAddress).address
          : "",
        city: this.props.fullAddress
          ? splitAddress(this.props.fullAddress).city
          : "",
        state: usStates.find(state => {
          let searchAbbrev
          if (this.props.fullAddress) {
            searchAbbrev = splitAddress(this.props.fullAddress).state
          } else {
            searchAbbrev = "VA"
          }
          return state.abbreviation === searchAbbrev
        }),
        zipCode: this.props.fullAddress
          ? splitAddress(this.props.fullAddress).zipCode
          : ""
      }),
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

  validateInput = () => {
    const newState = {
      email: {
        valid: isEmail(this.state.email || " ")
      },
      password: {
        valid: UserInfoForm.validPassword(this.state.password)
      },
      phone: {
        valid: isMobilePhone(this.state.phone || " ", "en-US")
      },
      name: {
        valid: this.state.name.split(" ").length > 1
      },
      address: {
        valid: this.state.address
      },
      city: {
        valid: this.state.city
      },
      zipCode: {
        valid: isPostalCode(this.state.zipCode || " ", "US")
      }
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

    this.setState(newState, this.props.onValidate(onValidateState))
  }

  componentDidUpdate() {
    const newState = {}
    if (this.props.email && this.props.email !== this.state.email.value) {
      newState.email = { value: this.props.email }
    }
    if (this.props.name && this.props.name !== this.state.name.value) {
      newState.name = { value: this.props.name }
    }
    if (newState.email || newState.name) {
      this.setState(newState)
    }
  }

  render() {
    return (
      <UserInfoFormWrapper fullWidth={this.props.forgotPassword}>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          error={this.state.formSubmitted && !this.state.email.valid}
          value={this.state.email.value}
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
              error={this.state.formSubmitted && !this.state.phone.valid}
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
              error={this.state.formSubmitted && !this.state.name.valid}
              value={this.state.name.value}
              onChange={this.handleBasicInput}
            />
            <TextField
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              error={this.state.formSubmitted && !this.state.address.valid}
              value={this.state.address.value}
              onChange={this.handleBasicInput}
            />
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="text"
              error={this.state.formSubmitted && !this.state.city.valid}
              value={this.state.city.value}
              onChange={this.handleBasicInput}
            />
            <StateSelect>
              <NativeSelect
                margin="dense"
                value={this.state.state.value.name}
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
              error={this.state.formSubmitted && !this.state.zipCode.valid}
              value={this.state.zipCode.value}
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
                error={this.state.formSubmitted && !this.state.password.valid}
                value={this.state.password.value}
                onChange={this.handleBasicInput}
                onFocus={this.props.openPopover}
              />
              {this.props.registering && (
                <RIMBAPopover anchorEl={this.passwordRef.current} />
              )}
            </div>
          )}
      </UserInfoFormWrapper>
    )
  }
}

const UserInfoFormWrapper = styled.div`
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoForm)
