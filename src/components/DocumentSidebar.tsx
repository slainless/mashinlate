import { createEffect, For, type ComponentProps } from "solid-js"
import { styled } from "styled-system/jsx"
import { Button } from "./base/button"
import { Plus } from "lucide-solid"
import { css } from "styled-system/css"
import { useDataStore } from "./context/app"

const Sidebar = styled("nav", {
  base: {
    borderEnd: "1px solid",
    borderEndColor: "border.subtle",
    maxW: "360px",
    // minW: "240px",
  },
})

export interface DocumentSidebarProps extends ComponentProps<typeof Sidebar> {}
export function DocumentSidebar(props: DocumentSidebarProps) {
  const [data] = useDataStore()

  return (
    <Sidebar {...props}>
      <div class={css({ p: "4", pb: "0", position: "sticky", top: "0" })}>
        {/* <div
          class={flex({
            justify: "space-between",
            marginBlockEnd: "4",
            opacity: 0.3,
          })}
        >
          <Logo h="5" />
          <Text size="xs">v{version}</Text>
        </div> */}
        <Button variant="outline" css={{ w: "100%" }}>
          New Document
          <Plus />
        </Button>
        {/* <Separator mt="4" /> */}
      </div>
      <div class={css({ p: "4" })}>
        <For each={Object.values(data.documents)}>
          {(item, index) => {
            return (
              <Button
                asChild={(props) => <a {...props()} />}
                size="sm"
                variant="ghost"
                w="100%"
              >
                <span
                  class={css({
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  })}
                >
                  {item.id}
                </span>
              </Button>
            )
          }}
        </For>
      </div>
    </Sidebar>
  )
}
