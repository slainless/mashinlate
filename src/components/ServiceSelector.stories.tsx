import type { Meta, StoryObj } from "storybook-solidjs"
import { fn } from "@storybook/test"
import { ServiceSelector } from "./ServiceSelector"
import { Card } from "./base/card"

const meta: Meta<typeof ServiceSelector> = {
  component: ServiceSelector,
}

export default meta
type Story = StoryObj<typeof ServiceSelector>

export const WithCard: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Card maxW="700px">
        <Card.Header>
          <Card.Title>Translation Services</Card.Title>
          <Card.Description>
            Add a service to use. You can add same service multiple times.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Story />
        </Card.Body>
      </Card>
    ),
  ],
}
