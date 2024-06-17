import {
  createContext,
  createMemo,
  createRenderEffect,
  createSignal,
  useContext,
  type Accessor,
  type ParentProps,
  type Signal,
} from "solid-js"
import { isServer } from "solid-js/web"
import { createThemeCookie, Theme } from "~/core/theme"

export const SSR_PREFERRED_THEME = Theme.Dark

export const ThemeContext = createContext(createSignal(Theme.System))

export interface ThemeProviderProps extends ParentProps {}
export function ThemeProvider(props: ThemeProviderProps) {
  let themeSignal: Signal<Theme>
  if (isServer) {
    themeSignal = createSignal(Theme.System as Theme)
  } else {
    const html = document.body.parentElement!
    themeSignal = createSignal((html.dataset["theme"] as Theme) ?? Theme.System)
  }

  const [theme, setTheme] = themeSignal

  createRenderEffect(() => {
    if (isServer) return
    if (theme() !== Theme.System) return

    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      ? Theme.Dark
      : Theme.Light
    setTheme(preferredTheme)
  })

  createRenderEffect(() => {
    if (isServer) return

    const html = document.body.parentElement!
    html.dataset["theme"] = theme()
    document.cookie = createThemeCookie(theme())
  })

  return <ThemeContext.Provider value={themeSignal} children={props.children} />
}

export function useTheme() {
  return useContext(ThemeContext)[0]
}

export function usePreferredTheme(): Accessor<Theme.Dark | Theme.Light> {
  const theme = useTheme()
  // @ts-expect-error
  return createMemo(() => {
    if (theme() !== Theme.System) return theme()
    if (isServer) return SSR_PREFERRED_THEME
    return window.matchMedia("(prefers-color-scheme: dark)")
      ? Theme.Dark
      : Theme.Light
  })
}

export function setTheme(theme: Theme) {
  return useContext(ThemeContext)[1](theme)
}

export function useThemeSignal() {
  return useContext(ThemeContext)
}
