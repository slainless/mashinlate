import { For } from "solid-js"
import { styled } from "styled-system/jsx"
import { vstack } from "styled-system/patterns"
import type { Service } from "~/core/document"
import { ServiceListItem, type PossibleEdge } from "./ServiceListItem"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"

const Container = styled("div", {
  base: vstack.raw({
    alignItems: "stretch",
    "--service-list-gap": "{spacing.2.5}",
    "--service-list-item-height": "calc({spacing.16} + {spacing.2})",
    gap: "var(--service-list-gap)",
  }),
})

type OrderChangeItem = {
  id: string
  index: number
  element: HTMLDivElement
}
export interface OrderChange {
  source: OrderChangeItem
  target: OrderChangeItem
  closestEdgeOfTarget: PossibleEdge
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

                const edge = extractClosestEdge(self.data)

                if (
                  fromId == null ||
                  fromOrder == null ||
                  toId == null ||
                  toOrder == null ||
                  edge == null ||
                  (edge != "top" && edge != "bottom")
                )
                  return

                props.onOrderChange?.({
                  source: {
                    id: fromId,
                    index: +fromOrder,
                    element: from,
                  },
                  target: {
                    id: toId,
                    index: +toOrder,
                    element: to,
                  },
                  closestEdgeOfTarget: edge,
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
