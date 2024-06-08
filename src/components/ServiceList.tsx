import { For } from "solid-js"
import { styled } from "styled-system/jsx"
import { vstack } from "styled-system/patterns"
import type { Service } from "~/core/document"
import { ServiceListItem } from "./ServiceListItem"
import { css } from "styled-system/css"
import { createStore, produce } from "solid-js/store"

const Container = styled("div", {
  base: vstack.raw({
    alignItems: "stretch",
    gap: "0",
    "--service-list-gap": "{spacing.2.5}",
    "--service-list-item-height": "calc({spacing.16} + {spacing.2})",
  }),
})

export interface OrderChange {
  from: { id: string; order: number; element: HTMLDivElement }
  to: { id: string; order: number; element: HTMLDivElement }
}

export interface ServiceListProps {
  services?: Service[]
  onOrderChange?: (change: OrderChange) => void
}
export function ServiceList(props: ServiceListProps) {
  return (
    <Container>
      <For each={props.services ?? []}>
        {(item, index) => {
          const order = item.order ?? index()
          return (
            <ServiceListItem
              service={item}
              onReceiveDrop={({ self, source }) => {
                const from = source.element as HTMLDivElement
                const to = self.element as HTMLDivElement

                const fromId = from.dataset["id"]
                const toId = to.dataset["id"]

                const fromOrder = from.dataset["order"]
                const toOrder = to.dataset["order"]

                if (
                  fromId == null ||
                  fromOrder == null ||
                  toId == null ||
                  toOrder == null
                )
                  return

                props.onOrderChange?.({
                  from: {
                    id: fromId,
                    element: from,
                    order: +fromOrder,
                  },
                  to: {
                    id: toId,
                    element: to,
                    order: +toOrder,
                  },
                })
              }}
              data-id={item.id}
              data-order={order}
              style={{ order }}
            />
          )
        }}
      </For>
    </Container>
  )
}
