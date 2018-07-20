import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import CloseIcon from "@material-ui/icons/Close"
import WarningIcon from "@material-ui/icons/Warning"
import IconButton from "@material-ui/core/IconButton"
import Slide from "@material-ui/core/Slide"
import green from "@material-ui/core/colors/green"
import amber from "@material-ui/core/colors/amber"
import red from "@material-ui/core/colors/red"
import blue from "@material-ui/core/colors/blue"

import styled from "styled-components"

import { connect } from "react-redux"
import { viewActionTypes } from "../../store/view"

export const variants = {
  error: "error",
  success: "success",
  warning: "warning",
  info: "info"
}
export const plsContact = "Please contact Cole Inman at eloc49@gmail.com"

const mapStateToProps = state => ({
  store: {
    view: state.view
  }
})

const mapDispatchToProps = dispatch => ({
  closeNotification: () => {
    dispatch({
      type: viewActionTypes.CLOSE_NOTIFICATION
    })
  }
})

class Notifications extends React.Component {

  variant = () => {
    switch (this.props.store.view.notification.variant) {
      case variants.error:
        return {
          color: red[600],
          icon: <ErrorIcon />
        }
      case variants.success:
        return {
          color: green[600],
          icon: <CheckCircleIcon />
        }

      case variants.warning:
        return {
          color: amber[600],
          icon: <WarningIcon />
        }

      case variants.info:
        return {
          color: blue[600],
          icon: <InfoIcon />
        }
    }
  }

  render() {
    return (
      <SnackbarWrapper color={this.variant().color}>
        <Snackbar
          open={this.props.store.view.notification.open}
          // TODO: get this working
          // TransitionComponent={() => {
          //   return (
          //     <Slide direction="down">
          //     </Slide>
          //   )
          // }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center"
          }}
          autoHideDuration={10000}
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
  }
`

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
