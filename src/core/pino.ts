import pino, { type Bindings, type ChildLoggerOptions } from "pino"
import { createMemo, type Component } from "solid-js"

export const baseLogger = pino({
  level: "trace",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
})

export function createLogger(
  component: Component | string,
  bindings?: Bindings,
  options?: ChildLoggerOptions,
) {
  return createMemo(() =>
    baseLogger.child(
      {
        component: typeof component === "string" ? component : component.name,
        ...bindings,
      },
      options,
    ),
  )
}
