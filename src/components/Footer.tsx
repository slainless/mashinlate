import { css } from "styled-system/css"
import { styled } from "styled-system/jsx"
import { version } from "../../package.json"
import { IconButton } from "./base/icon-button"
import { Github } from "lucide-solid"
import type { ComponentProps, ParentComponent } from "solid-js"
import { hstack } from "styled-system/patterns"

// export const Footer = styled("footer", {})

const AppName = () => (
  <div
    class={css({
      textStyle: "sm",
    })}
  >
    <span
      class={css({
        color: "neutral.text/20",
        marginInlineEnd: "2",
      })}
    >
      © 2024
    </span>
    <span
      class={css({
        color: "neutral.text/50",
        // fontStyle: "oblique",
      })}
    >
      マシンlate
    </span>
  </div>
)

const Icon = (props: ComponentProps<typeof IconButton>) => (
  <IconButton variant={"ghost"} opacity={0.4} px="1" h="8" minW="8" {...props}>
    {props.children}
  </IconButton>
)

export function Footer() {
  return (
    <div
      class={hstack({
        borderBlockStart: "1px solid",
        borderBlockStartColor: "border.subtle",
        py: "1",
        px: "5",
        justify: "space-between",
      })}
    >
      <AppName />
      <div>
        <Icon
        // asChild={(props) => (
        //   <a
        //     href="https://github.com/slainless/mashinlate"
        //     target="_blank"
        //     {...props()}
        //   />
        // )}
        >
          <Github />
        </Icon>
      </div>
    </div>
  )
}
