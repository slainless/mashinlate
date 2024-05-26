import type { ParentComponent } from "solid-js"
import { DocumentSidebar } from "../DocumentSidebar"
import { css } from "styled-system/css"
import { Header } from "../Header"
import { DocumentContainer } from "../DocumentContainer"
import { Footer } from "../Footer"

export const LayoutMain: ParentComponent = ({ children }) => {
  return (
    <div
      id="container"
      class={css({
        display: "grid",
        gridTemplateAreas: `
          "document-sidebar header" 
          "document-sidebar main"
          "document-sidebar footer"
        `,
        gridTemplateColumns: "20% auto",
        gridTemplateRows: "min-content auto 0",
        minH: "100vh",
      })}
    >
      <Header gridArea="header" />
      <DocumentSidebar gridArea="document-sidebar" />
      <DocumentContainer gridArea="main">{children}</DocumentContainer>
      <Footer gridArea="footer" />
    </div>
  )
}
