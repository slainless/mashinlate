import { parse, serialize } from "cookie"
import { createRenderEffect } from "solid-js"
import { getRequestEvent, isServer } from "solid-js/web"

export enum Theme {
  Dark = "dark",
  Light = "light",
  System = "system",
}

export const THEME_COOKIE_KEY = "use_theme"

function normalizeTheme(theme: string) {
  if (Object.values(Theme).includes(theme as Theme)) return theme as Theme
  return Theme.System
}

export function createThemeCookie(theme: Theme) {
  return serialize(THEME_COOKIE_KEY, theme, {
    maxAge: 60 * 60 * 24 * 365,
  })
}

export function handleServerThemeCookie() {
  const event = getRequestEvent()
  if (event == null) return

  const cookies = parse(event.request.headers.get("Cookie") ?? "")
  const preferredTheme = normalizeTheme(cookies[THEME_COOKIE_KEY])

  event.response.headers.append("Set-Cookie", createThemeCookie(preferredTheme))
  return preferredTheme
}
