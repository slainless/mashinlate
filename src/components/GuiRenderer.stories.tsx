import type { Meta, StoryObj } from "storybook-solidjs"
import { fn } from "@storybook/test"

import { GuiRenderer, type GuiComponent } from "./GuiRenderer"
import { Card } from "./base/card"

const meta: Meta<typeof GuiRenderer> = {
  component: GuiRenderer,
  decorators: [
    (Story) => (
      <Card maxW="500px">
        <Card.Header>
          <Card.Title>GUI Renderer</Card.Title>
        </Card.Header>
        <Card.Body>
          <Story />
        </Card.Body>
      </Card>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof GuiRenderer>

const schema = [
  {
    type: "string",
    key: "apiKey",
    label: "API Key",
    placeholder: "API Key",
  },
  { type: "text", key: "systemMessage", label: "System Message" },
] satisfies GuiComponent[]

export const Default: Story = {
  args: {
    schema,
    onChange: fn(),
  },
}
