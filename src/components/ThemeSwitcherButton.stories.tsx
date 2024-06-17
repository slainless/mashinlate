import type { Meta, StoryObj } from "storybook-solidjs"
import { ThemeSwitcherButton } from "./ThemeSwitcherButton"

const meta: Meta<typeof ThemeSwitcherButton> = {
  component: ThemeSwitcherButton,
}
export default meta

type Story = StoryObj<typeof ThemeSwitcherButton>
export const Default: Story = {}
