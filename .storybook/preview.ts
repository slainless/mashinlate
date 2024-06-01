import type { Preview } from "storybook-solidjs"
import { addons } from "@storybook/preview-api"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import "../src/app.css"
import { createEffect } from "solid-js"

// get channel to listen to event emitter
const channel = addons.getChannel()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      createEffect(() => {
        const listener = (isDark: boolean) => {
          document.body.parentElement!.dataset["theme"] = isDark
            ? "dark"
            : "light"
        }

        channel.on(DARK_MODE_EVENT_NAME, listener)
        return () => channel.off(DARK_MODE_EVENT_NAME, listener)
      }, [channel])

      return Story()
    },
  ],
}

export default preview
