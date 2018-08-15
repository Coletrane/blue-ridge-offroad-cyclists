import React from "react"
import Link from "next/link"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import CloseIcon from "@material-ui/icons/Close"
import WarningIcon from "@material-ui/icons/Warning"
import IconButton from "@material-ui/core/IconButton"
import green from "@material-ui/core/colors/green"
import amber from "@material-ui/core/colors/amber"
import red from "@material-ui/core/colors/red"
import blue from "@material-ui/core/colors/blue"

import styled from "styled-components"

import { connect } from "react-redux"
import { mapStateToProps } from "../../store/helpers"
import { viewActionTypes } from "../../store/view"
import { authActionTypes } from "../../store/auth"

export const variants = {
  error: "error",
  success: "success",
  warning: "warning",
  info: "info"
}
export const plsContact = "Please contact Cole Inman at eloc49@gmail.com"
export const NotificationMessage = ({ passwordOnly, resetPassword }) => {
  const passIncorrect = "Your password was incorrect"
  if (passwordOnly && !resetPassword) {
    return `${passIncorrect} please try again.`
  } else if (passwordOnly && resetPassword) {
    // TODO: test this
    return (
      <span>
        `${passIncorrect}. Forgot your password?`
        <Link
          onClick={this.props.dispatch({
            type: authActionTypes.FORGOT_PASSWORD
          })}
        >
          <a>Reset your password here.</a>
        </Link>
      </span>
    )
  } else {
    return `Your username or ${passIncorrect
      .charAt(0)
      .toLowerCase()}${passIncorrect.slice(1)}.`
  }
}
class Notifications extends React.Component {
  variant = () => {
    switch (this.props.store.view.notification.variant) {
      case variants.error:
        return {
          color: red[600],
          icon: <ErrorIcon id="notification-error-icon" />
        }
      case variants.success:
        return {
          color: green[600],
          icon: <CheckCircleIcon id="notification-success-icon" />
        }

      case variants.warning:
        return {
          color: amber[600],
          icon: <WarningIcon id="notification-warning-icon" />
        }

      case variants.info:
        return {
          color: blue[600],
          icon: <InfoIcon id="notification-info-icon" />
        }
    }
  }

  closeNotification = () => {
    this.props.dispatch({
      type: viewActionTypes.CLOSE_NOTIFICATION
    })
  }

  render() {
    return (
      <BROCSnackbar color={this.variant().color}>
        <Snackbar
          open={this.props.store.view.notification.open}
          onClose={this.closeNotification}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          autoHideDuration={20000}
        >
          <SnackbarContent
            id="notification-snackbar"
            aria-describedby="notification-content"
            message={
              <span id="notification-content">
                {this.variant().icon}
                {this.props.store.view.notification.message}
              </span>
            }
            action={[
              <IconButton
                id="notification-close-button"
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.closeNotification}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </BROCSnackbar>
    )
  }
}

const BROCSnackbar = styled.div`
    display: flex;
    align-items: center;
  }

  #notification-content svg {
    margin-right: 1rem;
  }
  #notification-snackbar {
    background-color: ${props => props.color};
    flex-wrap: nowrap;
  }
`

export default connect(mapStateToProps)(Notifications)
