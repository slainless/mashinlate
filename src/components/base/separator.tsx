import { Root } from "@kobalte/core/separator"
import type { ComponentProps } from "solid-js"
import { styled } from "styled-system/jsx"

export const Separator = styled(Root, {
  base: {
    // marginBlockStart: "2",
    // marginBlockEnd: "2",
    borderBlockStart: "none",
    "&[data-orientation=vertical]": {
      borderInlineEnd: "1px solid",
      borderInlineEndColor: "border.subtle",
      display: "list-item",
      height: "100%",
    },
    "&[data-orientation=horizontal]": {
      borderBlockEnd: "1px solid",
      borderBlockEndColor: "border.subtle",
    },
  },
})
export interface SeparatorProps extends ComponentProps<typeof Separator> {}
