import React from "react"
import Link from "next/link"

import {theme} from "../../util/styles"

import { githubUrl } from "../../../constants"

class RIMBAFooter extends React.Component {
  render() {
    return (
        <footer style={{
          backgroundColor: theme.palette.primary.dark
        }}>
          <div>Copyright 2018 Cole Inman</div>
          <div>
            <Link href={githubUrl}>
              <a>GitHub</a>
            </Link>
          </div>
        </footer>
    )
  }
}

export default RIMBAFooter
