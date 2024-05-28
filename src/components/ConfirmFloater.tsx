import { styled } from "styled-system/jsx"
import { hstack, vstack } from "styled-system/patterns"
import { Button } from "./base/button"
import { Show, type ComponentProps } from "solid-js"
import { useContent } from "./context/new-document"

const Floater = styled("div", {
  base: {
    background: "bg.default",
    shadow: "sm",
    borderRadius: "sm",
    w: "max-content",
    p: "3",
    marginInlineStart: "10",
  },
})

// const LanguageSelect = () => {
//   return <
// }

export interface ConfirmFloaterProps extends ComponentProps<typeof Floater> {}
export function ConfirmFloater(props: ConfirmFloaterProps) {
  const [content] = useContent()

  return (
    <Show when={content() !== ""}>
      <Floater {...props}>
        <div class={hstack()}>
          <Button size="sm">Confirm</Button>
        </div>
      </Floater>
    </Show>
  )
}
