import type { Meta, StoryObj } from "storybook-solidjs"
import { ServiceList, type OrderChange } from "./ServiceList"
import { AvailableServices } from "~/core/service-registry"
import { ServiceType, type Service } from "~/core/document"
import { css } from "styled-system/css"
import { fn } from "@storybook/test"
import { createStore, produce } from "solid-js/store"
import { createEffect, createMemo, createSignal, untrack } from "solid-js"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge"

const meta: Meta<typeof ServiceList> = {
  component: ServiceList,
  decorators: [
    (Story) => (
      <div class={css({ maxW: "500px" })}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ServiceList>

const exampleServices = [
  {
    id: crypto.randomUUID(),
    serviceName: AvailableServices.ChatGPT,
    type: ServiceType.LLM,
  },
  {
    id: crypto.randomUUID(),
    serviceName: AvailableServices.GoogleGenerativeAI,
    type: ServiceType.LLM,
  },
  {
    id: crypto.randomUUID(),
    serviceName: AvailableServices.GoogleTranslate,
    type: ServiceType.MTL,
  },
  {
    id: crypto.randomUUID(),
    serviceName: AvailableServices.DeepL,
    type: ServiceType.MTL,
  },
]
export const Default: Story = {
  args: {
    services: exampleServices,
    onOrderChange: fn(),
  },
}

export const SelfContained: Story = {
  render() {
    const [services, setServices] = createSignal(exampleServices)

    const handler = (change: OrderChange) => {
      setServices((services) =>
        reorderWithEdge({
          list: services,
          startIndex: change.source.index,
          indexOfTarget: change.target.index,
          axis: "vertical",
          closestEdgeOfTarget: change.closestEdgeOfTarget,
        }),
      )
    }

    return <ServiceList services={services()} onOrderChange={handler} />
  },
}
