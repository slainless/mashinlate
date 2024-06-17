import { createMemo, Index, type ComponentProps } from "solid-js"
import { Tabs } from "./base/tabs"
import { styled } from "styled-system/jsx"
import { createStore } from "solid-js/store"
import { css } from "styled-system/css"
import { useMatch } from "@solidjs/router"
import { ThemeSwitcherButton } from "./ThemeSwitcherButton"
import { hstack } from "styled-system/patterns/hstack"

const route = (
  display: string,
  defaultRoute: string,
  matchers: ReturnType<typeof useMatch>[],
) => ({
  display,
  matchers,
  defaultRoute,
})

const HeaderContainer = styled("header", {
  base: hstack.raw({
    p: "2",
    borderBlockEnd: "1px solid",
    borderBlockEndColor: "border.subtle",
    background: "bg.canvas/90",
    backdropBlur: "md",
    backdropFilter: "auto",
  }),
})

export interface HeaderProps extends ComponentProps<typeof HeaderContainer> {}
export function Header(props: HeaderProps) {
  const [routes, setRoutes] = createStore({
    document: route("Document", "/document", [
      useMatch(() => "/document"),
      useMatch(() => "/document/:id"),
    ]),
    service: route("Service", "/service", [useMatch(() => "/service")]),
  })

  const active = createMemo(() => {
    for (const id in routes)
      for (const match of routes[id as keyof typeof routes].matchers)
        if (match() != null)
          return [id, routes[id as keyof typeof routes]] as const
    return [null, null] as const
  })

  return (
    <HeaderContainer {...props}>
      <nav class={css({ w: "max-content" })}>
        <Tabs variant="enclosed" value={active()[0]}>
          <Tabs.List>
            <Index each={Object.entries(routes)}>
              {(item, index) => {
                const [key, route] = item()
                const active = route.matchers.reduce((a, b) =>
                  a() == null ? b : a,
                )
                return (
                  <Tabs.Trigger
                    value={key}
                    asChild={(props) => (
                      <a
                        href={active()?.path ?? route.defaultRoute}
                        {...props()}
                      />
                    )}
                  >
                    {route.display}
                  </Tabs.Trigger>
                )
              }}
            </Index>
            <Tabs.Indicator />
          </Tabs.List>
        </Tabs>
      </nav>
      <ThemeSwitcherButton size="xs" />
    </HeaderContainer>
  )
}
