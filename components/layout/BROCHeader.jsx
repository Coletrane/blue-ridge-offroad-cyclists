import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

import PropTypes from "prop-types"
import styled from "styled-components"

import { img } from "../../util/routes"
import { theme } from "../../util/styles"

const BROCHeader = props => {
  return (
    <BROCHeaderHeader>
      {props.image && <HeaderImage backgroundImage={`${img}/${props.image}`} />}
      {!props.image && (
        <BROCCarousel>
          <div>
            <img src={`${img}/cove-social.jpg`} />
          </div>
        </BROCCarousel>
      )}
    </BROCHeaderHeader>
  )
}
BROCHeader.propTypes = {
  image: PropTypes.string
}

const BROCHeaderHeader = styled.header`
  box-shadow: 0px 9px 25px 1px rgba(0, 0, 0, 0.75);
`
const BROCCarousel = styled(Carousel)`
  background-color: ${theme.palette.primary.main};
`
const HeaderImage = styled.div`
  width: 100%;
  background-image: ${props => props.backgroundImage};
`

export default BROCHeader
