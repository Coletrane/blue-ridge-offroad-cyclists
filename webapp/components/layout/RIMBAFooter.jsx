import React from "react"
import Link from "next/link"

import {theme} from "../../util/styles"

import { githubUrl } from "../../../constants"

import css from "./layout.css"

class RIMBAFooter extends React.Component {
  render() {
    return (
        <footer
          className={css.footer}
          style={{
          backgroundColor: theme.palette.primary.main
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
