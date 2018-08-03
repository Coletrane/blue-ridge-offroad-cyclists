import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

import styled from "styled-components"
import PropTypes from "prop-types"

class ModalLoader extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  render() {
    return (
      <Loader loading={this.props.loading}>
        <CircularProgress
          className="login-window-loading"
          size={60}
          thickness={4.6}
        />
      </Loader>
    )
  }
}

const Loader = styled.div`
  margin: auto;
  display: ${props => (props.loading ? "block" : "none")};
  position: absolute;
  left: 45%;
  top: 37%;
`

export const DialogContentWrapper = styled.div`
  visibility: ${props => (props.loading ? "hidden" : "")};
`

export default ModalLoader