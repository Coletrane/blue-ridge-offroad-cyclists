// import purple from "@material-ui/core/colors/purple"
// import lightBlue from "@material-ui/core/colors/lightBlue"
import red from "@material-ui/core/colors/red"
import orange from "@material-ui/core/colors/orange"

export const fonts = {
  IBMPlexMono: {
    name: "IBM Plex Mono",
    style: "monospace"
  }
}
export const cssFont = (font) => {
    return `${font.name}, ${font.style}`
}

export const theme = {
  palette: {
    primary: {
      light: red[300],
      main: red[500],
      dark: red[700]
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700]
    }
  },
  typography: {
    fontFamily: Object.keys(fonts)
      .map(font => fonts[font].name)
      .join(",")
  }
}
