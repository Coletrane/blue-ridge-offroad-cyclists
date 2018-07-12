import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

import PropTypes from "prop-types"
import styled from "styled-components"

import routes from "../../util/routes"

class RIMBAHeader extends React.Component {
  static propTypes = {
    image: PropTypes.string
  }

  render() {
    if (this.props.image) {
      return <HeaderImage />
    } else {
      return (
        <Carousel>
          <div>
            <img src={`${routes.img}/cove-social.jpg`} />
          </div>
        </Carousel>
      )
    }
  }
}

const HeaderImage = styled.div`
  width: 100%;
  background-image: url(\"${props => props.image}\");
`
export default RIMBAHeader
