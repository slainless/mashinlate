import { Theme } from "~/core/theme"
import { IconButton, type IconButtonProps } from "./base/icon-button"
import { ThemeContext, useThemeSignal } from "./ThemeProvider"
import { Moon, Sun, SunMoon } from "lucide-solid"
import { splitProps } from "solid-js"

export interface ThemeSwitcherProps extends IconButtonProps {}
export function ThemeSwitcherButton(props: ThemeSwitcherProps) {
  const [splittedProps, restProps] = splitProps(props, ["onClick"])
  const [theme, setTheme] = useThemeSignal()

  const IconComp =
    theme() === Theme.Dark ? Moon : theme() === Theme.Light ? Sun : SunMoon

  return (
    <IconButton
      variant="ghost"
      onClick={(e) => {
        if (typeof splittedProps.onClick == "function")
          splittedProps.onClick?.(e)

        if (theme() === Theme.Dark) setTheme(Theme.Light)
        else if (theme() === Theme.Light) setTheme(Theme.System)
        else setTheme(Theme.Dark)
      }}
      {...restProps}
    >
      <IconComp />
    </IconButton>
  )
}
