import type { ParentComponent } from "solid-js"
import { DocumentSidebar } from "../DocumentSidebar"
import { css } from "styled-system/css"
import { Header } from "../Header"
import { DocumentContainer } from "../DocumentContainer"
import { Footer } from "../Footer"
import { styled } from "styled-system/jsx"

const Grid = styled("div", {
  base: {
    display: "grid",
    gridTemplateAreas: `
      "document-sidebar header" 
      "document-sidebar main"
      "document-sidebar footer"
    `,
    gridTemplateColumns: "240px auto",
    gridTemplateRows: "min-content auto 0",
    minH: "100vh",
  },
})

export const LayoutMain: ParentComponent = ({ children }) => {
  return (
    <Grid id="container">
      <Header gridArea="header" />
      <DocumentSidebar gridArea="document-sidebar" />
      <DocumentContainer gridArea="main">{children}</DocumentContainer>
      <Footer gridArea="footer" />
    </Grid>
  )
}
