import type { ParentComponent } from "solid-js"

export const LayoutMain: ParentComponent = ({ children }) => {
  return (
    <div id="container">
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}
