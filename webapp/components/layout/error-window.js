import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import withMobileDialog from "@material-ui/core/withMobileDialog"

import PropTypes from "prop-types"

import { connect } from "react-redux"
import { confirmRegister } from "../../store/auth"
import { viewActionTypes } from "../../store/view"

const mapStateToProps = state => ({
  ...state.auth,
  ...state.view
})

const mapDispatchToProps = dispatch => ({
  confirmRegister: (email, code) => {
    dispatch(confirmRegister(email, code))
  },
  closeErrorWindow: () => {
    dispatch({
      type: viewActionTypes.CLOSE_ERROR_WINDOW
    })
  }
})

class ErrorWindow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Dialog
        open={this.props.errorWindowOpen}
        aria-labelledby="error-dialog-title"
      >
        <DialogTitle id="error-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText>Error</DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMobileDialog()(ErrorWindow))
