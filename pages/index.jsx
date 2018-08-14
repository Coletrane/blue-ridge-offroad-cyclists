import React from "react"
import DefaultLayout from "../components/layout/DefaultLayout"
import BROCHeader from "../components/layout/BROCHeader"

import styled from "styled-components"

const Index = () => {

  return (
    <DefaultLayout>
      <BROCHeader />
      <MainContent>
        <h1>Welcome to the Roanoke IMBA Member Portal</h1>
        <h3>Please sign up or log in.</h3>
      </MainContent>
    </DefaultLayout>
  )
}

const MainContent = styled.div`
  padding: 2rem;
`
export default Index
