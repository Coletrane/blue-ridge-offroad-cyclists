import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

import PropTypes from "prop-types"

import routes from "../../util/routes"

class RIMBAHeader extends React.Component {
  static propTypes = {
    image: PropTypes.string
  }

  render() {
    if (this.props.image) {
      return (
        <div className="header-image"
             style={{
               backgroundImage: `${routes.img}/${this.props.image}`
             }}>
        </div>
      )
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

export default RIMBAHeader
