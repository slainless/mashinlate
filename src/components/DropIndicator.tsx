import { css } from "styled-system/css"
import { cva } from "styled-system/css/cva"
import { styled } from "styled-system/jsx"

export const dropIndicator = cva({
  base: {
    "--dot-size": "{spacing.2}",
    display: "block",
    colorPalette: "accent",
    // h: "2px",
    border: "1px solid",
    w: "calc(100% - calc(var(--dot-size) / 2))",
    borderColor: "colorPalette.11",
    position: "relative",
    marginLeft: "calc(var(--dot-size) / 2)",
    "&::before": {
      content: `""`,
      w: "var(--dot-size)",
      h: "var(--dot-size)",
      position: "absolute",
      left: "calc(-1 * var(--dot-size))",
      top: "50%",
      transform: "translateY(-50%)",
      border: "2px solid",
      borderColor: "colorPalette.11",
      display: "block",
      borderRadius: "full",
    },
  },
})

export const DropIndicator = styled("div", dropIndicator)
