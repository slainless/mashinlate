import { Index } from "solid-js"
import { Card, type RootProps } from "./base/card"
import { availableServices } from "./service"
import { styled } from "styled-system/jsx"
import { ServiceLogo } from "./ServiceLogo"
import { css } from "styled-system/css"
import { ToggleGroup } from "@ark-ui/solid"
import type { AvailableServices } from "~/core/service-registry"

const Container = styled(ToggleGroup.Root, {
  base: {
    display: "grid",
    gridTemplateColumns: "3",
    gap: "3",
  },
})

const Item = styled(ToggleGroup.Item, {
  base: {
    bg: "bg.subtle",
    p: "3",
    border: "1px solid",
    borderRadius: "sm",
    textAlign: "start",
    borderColor: "transparent",
    _light: {
      borderColor: "border.subtle",
    },
    "&[data-state=on]": {
      borderColor: "border.outline !important",
      shadow: "xs",
    },
    _hover: {
      borderColor: "border.default",
      shadow: "xs",
    },
  },
})

export interface ServiceSelectorProps extends RootProps {}
export function ServiceSelector() {
  return (
    <Container>
      <Index each={Object.entries(availableServices)}>
        {(item, index) => {
          const [key, value] = item()
          return (
            <Item
              // asChild={(props) => <Item {...props()} />}
              value={key}
            >
              <ServiceLogo h="8" service={key as AvailableServices} />
              <div class={css({ textStyle: "sm", mt: "2", fontWeight: "600" })}>
                {value.title}
              </div>
              <div class={css({ textStyle: "xs", mt: "1", color: "fg.muted" })}>
                {value.desc}
              </div>
            </Item>
          )
        }}
      </Index>
    </Container>
  )
}
