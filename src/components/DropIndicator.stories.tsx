import type { Meta, StoryObj } from "storybook-solidjs"
import { DropIndicator } from "./DropIndicator"
import { css } from "styled-system/css"
import { Text } from "./base/text"

const meta: Meta<typeof DropIndicator> = {
  component: DropIndicator,
}
export default meta

type Story = StoryObj<typeof DropIndicator>
export const Default: Story = {}

export const OnTop: Story = {
  decorators: [
    (Story) => {
      return (
        <div
          class={css({
            position: "relative",
            w: "100px",
            border: "1px solid",
            borderColor: "border.default",
            p: "1",
          })}
        >
          <div
            class={css({
              position: "absolute",
              top: "-1px",
              w: "100%",
              left: "0",
            })}
          >
            <Story />
          </div>

          <Text>Drop target</Text>
        </div>
      )
    },
  ],
}
