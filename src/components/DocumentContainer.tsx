import type { ComponentProps } from "solid-js"
import { css } from "styled-system/css"
import { splitCssProps, type StyledComponent } from "styled-system/jsx"
import { container } from "styled-system/patterns"

export interface DocumentContainerProps
  extends ComponentProps<StyledComponent<"main">> {}
export function DocumentContainer(props: DocumentContainerProps) {
  const [cssProps, restProps] = splitCssProps(props)
  const { css: cssProp, ...styleProps } = cssProps
  const { children, ...rest } = restProps

  return (
    <main class={css(container.raw({}), styleProps, cssProp)} {...rest}>
      {children}
    </main>
  )
}
