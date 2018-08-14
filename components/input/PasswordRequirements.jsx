import React from "react"
import styled from "styled-components"

import { passwordMessages } from "../../store/view"
import { cssFont, fonts } from "../../util/styles"

const PasswordRequirements = () => {
  return <Text>{passwordMessages.requirements}</Text>
}

const Text = styled.span`
  font-size: .75rem;
  color: rgba(0, 0, 0, 0.87);
  font-family: ${cssFont(fonts.IBMPlexMono)};
`

export default PasswordRequirements
