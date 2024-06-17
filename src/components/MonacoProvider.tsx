import { createAsync } from "@solidjs/router"
import {
  createContext,
  createRenderEffect,
  createSignal,
  useContext,
  type ParentProps,
} from "solid-js"
import { isServer } from "solid-js/web"
import { createLogger } from "~/core/pino"

const def = (i: any) => i.default

export const MonacoContext = createContext({
  isReady: createSignal(false)[0],
})

export interface MonacoProviderProps extends ParentProps {}
export function MonacoProvider(props: MonacoProviderProps) {
  const logger = createLogger(MonacoProvider)
  const [isReady, setIsReady] = createSignal(false)

  const packages = createAsync(async () => {
    if (isServer) return
    return Promise.all([
      import("monaco-editor/esm/vs/editor/editor.worker?worker").then(def),
      import("monaco-editor/esm/vs/language/json/json.worker?worker").then(def),
      // import("monaco-editor/esm/vs/language/css/css.worker?worker").then(def),
      // import("monaco-editor/esm/vs/language/html/html.worker?worker").then(
      //   def,
      // ),
      // import(
      //   "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
      // ).then(def),
    ])
  })

  createRenderEffect(async () => {
    if (isServer) return
    if (packages() == null) return

    logger().debug({ packages: ["json", "editor"] }, "Worker package(s) loaded")
    const [editorWorker, jsonWorker] = packages()!

    self.MonacoEnvironment = {
      getWorker(_, label) {
        if (label === "json") {
          return new jsonWorker()
        }
        // if (label === "css" || label === "scss" || label === "less") {
        //   return new cssWorker()
        // }
        // if (label === "html" || label === "handlebars" || label === "razor") {
        //   return new htmlWorker()
        // }
        // if (label === "typescript" || label === "javascript") {
        //   return new tsWorker()
        // }
        return new editorWorker()
      },
    }
    logger().debug("Monaco environment ready")
    setIsReady(true)

    return () => {
      if (self.MonacoEnvironment) {
        delete self.MonacoEnvironment["getWorker"]
      }
      setIsReady(false)
    }
  })

  return (
    <MonacoContext.Provider
      children={props.children}
      value={{
        isReady,
      }}
    />
  )
}

export function useMonacoReady() {
  return useContext(MonacoContext).isReady
}
