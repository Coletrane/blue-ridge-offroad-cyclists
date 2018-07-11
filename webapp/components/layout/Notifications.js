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

import { connect } from "react-redux"
import { viewActionTypes } from "../../store/view"

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
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Snackbar
        open={this.props.store.view.notification.open}
        variant={this.props.store.view.notification.variant}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        autoHideDuration={10000}
      >
        <SnackbarContent
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar">
              {(() => {
                switch (this.props.store.view.notification.variant) {
                  case "error":
                    return (
                      <ErrorIcon/>
                    )
                  case "success":
                    return (
                      <CheckCircleIcon/>
                    )
                  case "warning":
                    return (
                      <WarningIcon/>
                    )
                  case "info":
                    return (
                      <InfoIcon/>
                    )
                }
              })()}
              {this.props.store.view.notification.message}
            </span>
          }
          onClose={() => {
            if (this.props.store.view.notification.onClose &&
                typeof this.props.store.view.notification.onClose === 'function') {
              this.props.store.view.notification.onClose()
            }
          }}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.props.closeNotification()}
            >
              <CloseIcon/>
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
