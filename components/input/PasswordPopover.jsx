import React from "react"
import Popover from "@material-ui/core/Popover"

import PropTypes from "prop-types"

class PasswordPopover extends React.Component {
  static propTypes = {
    focused: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    onClose: PropTypes.func
  }

  render() {

    return (
      <Popover
        open={this.props.focused}
        disableAutoFocus={true}
        disableRestoreFocus={true}
        anchorEl={this.props.anchorEl}
        onClose={this.props.onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        Must contain at least 8 characters and a special character.
      </Popover>
    )
  }
}

export default PasswordPopover
