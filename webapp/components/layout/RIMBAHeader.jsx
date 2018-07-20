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
    return (
      <HeaderWrapper>
        {this.props.image && (
          <HeaderImage backgroundImage={`${routes.img}/${this.props.image}`}/>
        )}
        {!this.props.image && (
          <Carousel>
            <div>
              <img src={`${routes.img}/cove-social.jpg`} />
            </div>
          </Carousel>
        )}
      </HeaderWrapper>
    )
  }

}

const HeaderWrapper = styled.header`
  box-shadow: 0px 9px 25px 1px rgba(0, 0, 0, 0.75);
`
const HeaderImage = styled.div`
  width: 100%;
  background-image: ${props => props.backgroundImage}
`

export default RIMBAHeader