import { Index, type ComponentProps, type ParentProps } from "solid-js"
import { Tabs } from "./base/tabs"
import { styled, type StyledComponent } from "styled-system/jsx"
import { createStore } from "solid-js/store"
import { css } from "styled-system/css"

const route = (id: string, route: string, display: string) => ({
  id,
  route,
  display,
})

const HeaderContainer = styled("header", {
  base: {
    p: "2",
    borderBlockEnd: "1px solid",
    borderBlockEndColor: "border.subtle",
  },
})

export interface HeaderProps extends ComponentProps<typeof HeaderContainer> {}
export function Header(props: HeaderProps) {
  const [routes, setRoutes] = createStore([
    route("document", "/document", "Document"),
    route("service", "/service", "Service"),
  ])
  return (
    <HeaderContainer {...props}>
      <nav class={css({ w: "max-content" })}>
        <Tabs variant="enclosed" defaultValue="document">
          <Tabs.List>
            <Index each={routes}>
              {(item, index) => {
                return (
                  <Tabs.Trigger key={item().id} value={item().route}>
                    {item().display}
                  </Tabs.Trigger>
                )
              }}
            </Index>
            <Tabs.Indicator />
          </Tabs.List>
        </Tabs>
      </nav>
    </HeaderContainer>
  )
}
