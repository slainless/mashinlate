import { Type, type Static } from "@sinclair/typebox"
import { isServer } from "solid-js/web"
import { TypeCompiler } from "@sinclair/typebox/compiler"

export namespace Schema {
  export const AppContext = Type.Object({
    activeDocument: Type.Optional(
      Type.Union([Type.String(), Type.Undefined()]),
    ),
    database: Type.Optional(Type.Union([Type.String(), Type.Undefined()])),
  })
}

export namespace Compiled {
  export const AppContext = TypeCompiler.Compile(Schema.AppContext)
}

export type AppContext = Static<typeof Schema.AppContext>

export function lenientLoadAppCtx(key: string): AppContext {
  function defaultContext(id?: string) {
    return {
      activeDocument: undefined,
      database: id,
    }
  }

  if (isServer) return defaultContext()

  const rawContext = window.localStorage.getItem(key)
  if (rawContext == "" || rawContext == null)
    return defaultContext(crypto.randomUUID())
  try {
    // const parsed = deserialize(rawContext)
    const parsed = JSON.parse(rawContext)
    if (Compiled.AppContext.Check(parsed)) return parsed
    throw new TypeError(
      "App context is not compatible with current schema specification",
    )
  } catch (e) {
    console.error(e)
    console.warn(`App context is corrupt. Backup created at \`${key}_backup\``)
    window.localStorage.setItem(`${key}_backup`, rawContext)

    const context = defaultContext(crypto.randomUUID())
    // window.localStorage.setItem(key, serialize(context))
    window.localStorage.setItem(key, JSON.stringify(context))
    return context
  }
}

export function writeAppCtx(key: string, context: AppContext) {
  // window.localStorage.setItem(key, serialize(context))
  window.localStorage.setItem(key, JSON.stringify(context))
}
