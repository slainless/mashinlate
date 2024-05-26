import { Root } from "@kobalte/core/separator"
import type { ComponentProps } from "solid-js"
import { styled } from "styled-system/jsx"

export const Separator = styled(Root, {
  base: {
    borderBlockStart: "none",
    borderBlockEnd: "1px solid",
    borderBlockEndColor: "border.subtle",
    // marginBlockStart: "2",
    // marginBlockEnd: "2",
  },
})
export interface SeparatorProps extends ComponentProps<typeof Separator> {}
