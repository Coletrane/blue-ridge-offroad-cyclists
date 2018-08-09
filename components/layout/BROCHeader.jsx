import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

import PropTypes from "prop-types"
import styled from "styled-components"

import { img } from "../../util/routes"
import { theme } from "../../util/styles"

class BROCHeader extends React.Component {
  static propTypes = {
    image: PropTypes.string
  }

  render() {
    return (
      <BROCHeaderWrapper>
        {this.props.image && (
          <HeaderImage backgroundImage={`${img}/${this.props.image}`} />
        )}
        {!this.props.image && (
          <BROCCarousel>
            <Carousel>
              <div>
                <img src={`${img}/cove-social.jpg`} />
              </div>
            </Carousel>
          </BROCCarousel>
        )}
      </BROCHeaderWrapper>
    )
  }
}

const BROCHeaderWrapper = styled.header`
  box-shadow: 0px 9px 25px 1px rgba(0, 0, 0, 0.75);
`
const BROCCarousel = styled.div`
  background-color: ${theme.palette.primary.main};
`
const HeaderImage = styled.div`
  width: 100%;
  background-image: ${props => props.backgroundImage};
`

export default BROCHeader
