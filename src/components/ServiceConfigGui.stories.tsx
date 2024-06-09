import type { Meta, StoryObj } from "storybook-solidjs"
import { fn } from "@storybook/test"

import { Card } from "./base/card"
import { ServiceConfigGui } from "./ServiceConfigGui"
import { availableServices } from "./service"
import { AvailableServices } from "~/core/service-registry"

const meta: Meta<typeof ServiceConfigGui> = {
  component: ServiceConfigGui,
  decorators: [
    (Story, ctx) => (
      <Card maxW="500px">
        <Card.Header>
          <Card.Title>
            {availableServices[ctx.args.service].title} Config
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Story />
        </Card.Body>
      </Card>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ServiceConfigGui>

export const ChatGPT: Story = {
  args: {
    service: AvailableServices.ChatGPT,
    onChange: fn(),
  },
}

export const ChatGPTUnofficialProxy: Story = {
  args: {
    service: AvailableServices.ChatGPTUnofficialProxy,
    onChange: fn(),
  },
}

export const DeepL: Story = {
  name: "DeepL",
  args: {
    service: AvailableServices.DeepL,
    onChange: fn(),
  },
}

export const GoogleGenerativeAI: Story = {
  args: {
    service: AvailableServices.GoogleGenerativeAI,
    onChange: fn(),
  },
}

export const GoogleTranslate: Story = {
  args: {
    service: AvailableServices.GoogleTranslate,
    onChange: fn(),
  },
}
