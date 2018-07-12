import React from "react"
import DefaultLayout from "../components/layout/DefaultLayout"
import RIMBAHeader from "../components/layout/RIMBAHeader"

export default class Index extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <RIMBAHeader/>
      </DefaultLayout>
    )
  }
}
