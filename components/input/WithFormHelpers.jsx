import React from "react"
import { userInfoFormSubmit } from "../../util/event-types"

const withFormHelpers = (WrappedComponent) => {
  class WithFormHelpers extends React.Component {
    constructor(props) {
      super(props)
      this.validateInput = this.validateInput.bind(this)
    }



    static

    validateInput = () => {}



    render() {
      return <WrappedComponent {...this.props}/>
    }
  }

  return WithFormHelpers
}

export default withFormHelpers