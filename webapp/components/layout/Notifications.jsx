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
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Snackbar
        open={this.props.store.view.notification.open}
        variant={this.props.store.view.notification.variant}
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
          aria-describedby="client-snackbar"
          style={(() => {
            let styles = {}
            switch (this.props.store.view.notification.variant) {
              case variants.error:
                styles.backgroundColor = red[600]
                break
              case variants.success:
                styles.backgroundColor = green[600]
                break
              case variants.warning:
                styles.backgroundColor = amber[600]
                break
              case variants.info:
                styles.backgroundColor = blue[600]
                break
            }
            return styles
          })()}
          message={
            <span id="client-snackbar">
              {(() => {
                switch (this.props.store.view.notification.variant) {
                  case variants.error:
                    return <ErrorIcon />
                  case variants.success:
                    return <CheckCircleIcon />
                  case variants.warning:
                    return <WarningIcon />
                  case variants.info:
                    return <InfoIcon />
                }
              })()}
              {this.props.store.view.notification.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.props.closeNotification()}
            >
              <CloseIcon />
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
