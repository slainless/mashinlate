import type { Preview } from "storybook-solidjs"
import { addons } from "@storybook/preview-api"
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode"
import "../src/app.css"
import { createEffect, createRoot, createSignal } from "solid-js"
import { Theme } from "../src/core/theme"
import { ThemeContext } from "../src/components/ThemeProvider"

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
      const themeSignal = createSignal(Theme.System)
      const [theme, setTheme] = themeSignal

      createEffect(() => {
        const listener = (isDark: boolean) => {
          setTheme(isDark ? Theme.Dark : Theme.Light)
        }

        channel.on(DARK_MODE_EVENT_NAME, listener)
        return () => channel.off(DARK_MODE_EVENT_NAME, listener)
      }, [channel])

      createEffect(() => {
        switch (theme()) {
          case Theme.System:
            const preferredTheme = window.matchMedia(
              "(prefers-color-scheme: dark)",
            )
              ? Theme.Dark
              : Theme.Light
            return setTheme(preferredTheme)
          case Theme.Dark:
          case Theme.Light:
            return void (document.body.parentElement!.className = theme())
        }
      })

      return (
        <ThemeContext.Provider value={themeSignal}>
          <Story />
        </ThemeContext.Provider>
      )

      // return ThemeContext.Provider({
      //   children: Story,
      //   value: themeSignal,
      // })
    },
  ],
}

export default preview
