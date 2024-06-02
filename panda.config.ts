import { defineConfig, defineGlobalStyles } from "@pandacss/dev"
import { createPreset } from "@park-ui/panda-preset"

export default defineConfig({
  preflight: true,
  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: "indigo",
      grayColor: "olive",
      borderRadius: "sm",
    }),
  ],
  include: [
    "./src/routes/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  exclude: [],
  jsxFramework: "solid",
  outdir: "styled-system",
  outExtension: "js",
  conditions: {
    extend: {
      dark: "&.dark, .dark &, [data-theme=dark] &",
      light: "&.light, .light &, [data-theme=light] &",
    },
  },
  globalVars: {
    extend: {
      "--global-font-body": '"Plus Jakarta Sans"',
    },
  },
})
