import type { Meta, StoryObj } from "storybook-solidjs"
import { fn } from "@storybook/test"
import { JSONEditor } from "./JSONEditor"
import { css } from "styled-system/css"
import { MonacoProvider } from "./MonacoProvider"

const meta: Meta<typeof JSONEditor> = {
  component: JSONEditor,
  decorators: [
    (Story) => (
      <MonacoProvider>
        <Story />
      </MonacoProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof JSONEditor>

export const Default: Story = {
  args: {},
}
