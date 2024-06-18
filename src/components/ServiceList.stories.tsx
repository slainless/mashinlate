import type { Meta, StoryObj } from "storybook-solidjs"
import { ServiceList, type OrderChange } from "./ServiceList"
import { AvailableServices } from "~/core/service-registry"
import { ServiceType, type Service } from "~/core/document"
import { css } from "styled-system/css"
import { fn } from "@storybook/test"
import { createStore, produce } from "solid-js/store"
import { createEffect, createMemo, untrack } from "solid-js"

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
