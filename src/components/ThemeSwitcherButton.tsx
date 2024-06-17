import { Theme } from "~/core/theme"
import { IconButton, type IconButtonProps } from "./base/icon-button"
import { ThemeContext, useThemeSignal } from "./ThemeProvider"
import { Moon, Sun, SunMoon } from "lucide-solid"

export interface ThemeSwitcherProps extends IconButtonProps {}
export function ThemeSwitcherButton(props: ThemeSwitcherProps) {
  const { onClick, ...restProps } = props
  const [theme, setTheme] = useThemeSignal()

  const IconComp =
    theme() === Theme.Dark ? Moon : theme() === Theme.Light ? Sun : SunMoon

  return (
    <IconButton
      variant="ghost"
      onClick={(e) => {
        if (typeof onClick == "function") onClick?.(e)

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
