import React from "react"

import { connect } from "react-redux"

const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view
})

// const mapDispatchToProps = dispatch
class Profile extends React.Component {

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default connect(mapStateToProps)(Profile)