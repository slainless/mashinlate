import { For, type ComponentProps } from "solid-js"
import { useDocuments } from "./context/app"
import type { HTMLStyledProps, StyledComponent } from "styled-system/types"
import { splitCssProps, styled } from "styled-system/jsx"

const Sidebar = styled("nav", {
  base: {
    borderEnd: "1px solid",
    borderEndColor: "border.subtle",
  },
})

export interface DocumentSidebarProps extends ComponentProps<typeof Sidebar> {}
export function DocumentSidebar(props: DocumentSidebarProps) {
  const documents = useDocuments()
  return (
    <Sidebar {...props}>
      Documents:
      <ul>
        <For each={documents}>
          {(item) => {
            return <li>Document: {item.id}</li>
          }}
        </For>
      </ul>
    </Sidebar>
  )
}
