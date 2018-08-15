import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

import styled from "styled-components"
import PropTypes from "prop-types"

const Loader = props => {
  const circularProgress = (
    <CircularProgress
      className="login-window-loading"
      size={60}
      thickness={4.6}
    />
  )

  const circularProgressWithType = () => {
    switch (props.type) {
      case loaderTypes.modal:
        return <ModalLoader>{circularProgress}</ModalLoader>
      case loaderTypes.paper:
        return <PaperLoader>{circularProgress}</PaperLoader>
    }
  }

  return (
    <div>
      <BROCCircularProgress loading={props.loading}>
        {circularProgressWithType()}
      </BROCCircularProgress>
      <BROCLoaderContent loading={props.loading}>
        {props.children}
      </BROCLoaderContent>
    </div>
  )
}
Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
}

export const loaderTypes = {
  modal: "modal",
  paper: "paper"
}
const ModalLoader = styled.div`
  margin: auto;
  position: absolute;
  left: 40%;
  top: 40%;
`
const PaperLoader = styled.div`
  position: absolute;
  top: 29%;
  left: 22%;
`
const BROCCircularProgress = styled.div`
  display: ${props => (props.loading ? "block" : "none")};
`
export const BROCLoaderContent = styled.div`
  visibility: ${props => (props.loading ? "hidden" : "")};
`

export default Loader
