import React from "react"
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

export const variants = {
  error: "error",
  success: "success",
  warning: "warning",
  info: "info"
}
export const plsContact = "Please contact Cole Inman at eloc49@gmail.com"

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
      <SnackbarWrapper color={this.variant().color}>
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
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.props.closeNotification}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </SnackbarWrapper>
    )
  }
}

const SnackbarWrapper = styled.div`
  #notification-content {
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
