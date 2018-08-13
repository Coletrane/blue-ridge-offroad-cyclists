import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

import styled from "styled-components"
import PropTypes from "prop-types"

const ModalLoader = props => {
  return (
    <BROCCircularProgress loading={props.loading}>
      <CircularProgress
        className="login-window-loading"
        size={60}
        thickness={4.6}
      />
    </BROCCircularProgress>
  )
}
ModalLoader.propTypes = {
  loading: PropTypes.bool.isRequired
}

const BROCCircularProgress = styled.div`
  margin: auto;
  display: ${props => (props.loading ? "block" : "none")};
  position: absolute;
  left: 45%;
  top: 37%;
`

export const BROCDialogContent = styled.div`
  visibility: ${props => (props.loading ? "hidden" : "")};
`

export default ModalLoader
