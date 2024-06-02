import type { StorybookConfig } from "storybook-solidjs-vite"
import { mergeConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
  ],
  framework: {
    name: "storybook-solidjs-vite",
    options: {},
  },
  viteFinal: (cfg) =>
    mergeConfig(cfg, {
      plugins: [tsconfigPaths()],
    }),
}
export default config
