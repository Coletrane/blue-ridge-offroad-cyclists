import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

import styled from "styled-components"
import PropTypes from "prop-types"

const Loader = props => {
  return (
    <div>
      <BROCCircularProgress loading={props.loading}>
        <CircularProgress
          className="login-window-loading"
          size={60}
          thickness={4.6}
        />
      </BROCCircularProgress>
      <BROCLoaderContent loading={props.loading}>
        {props.children}
      </BROCLoaderContent>
    </div>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
}

const BROCCircularProgress = styled.div`
  display: ${props => (props.loading ? "block" : "none")};
  margin: auto;
  position: absolute;
  left: 40%;
  top: 40%;
`
export const BROCLoaderContent = styled.div`
  visibility: ${props => (props.loading ? "hidden" : "")};
`

export default Loader
