import React from "react"
import Link from "next/link"

import styled from "styled-components"

import { theme } from "../../util/styles"
import { githubUrl } from "../../../constants"

class RIMBAFooter extends React.Component {
  render() {
    return (
      <RIMBAFooterWrapper
        style={{
          backgroundColor: theme.palette.primary.main
        }}
      >
        <div>Copyright 2018 Cole Inman</div>
        <div>
          <Link href={githubUrl}>
            <a>GitHub</a>
          </Link>
        </div>
      </RIMBAFooterWrapper>
    )
  }
}

const RIMBAFooterWrapper = styled.footer`
  text-align: center;
  box-shadow: 0px -9px 25px 1px rgba(0, 0, 0, 0.75);
`
export default RIMBAFooter
