import {
  createContext,
  createRenderEffect,
  createSignal,
  useContext,
  type ParentProps,
} from "solid-js"
import { isServer } from "solid-js/web"

export const MonacoContext = createContext({
  isReady: createSignal(false)[0],
})

export interface MonacoProviderProps extends ParentProps {}
export function MonacoProvider(props: MonacoProviderProps) {
  const [isReady, setIsReady] = createSignal(false)

  createRenderEffect(async () => {
    if (isServer) return

    const def = (i: any) => i.default
    const [
      editorWorker,
      jsonWorker,
      // cssWorker,
      // htmlWorker,
      // tsWorker
    ] = await Promise.all([
      import("monaco-editor/esm/vs/editor/editor.worker?worker").then(def),
      import("monaco-editor/esm/vs/language/json/json.worker?worker").then(def),
      // import("monaco-editor/esm/vs/language/css/css.worker?worker").then(def),
      // import("monaco-editor/esm/vs/language/html/html.worker?worker").then(
      //   def,
      // ),
      // import(
      //   "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
      // ).then(def),
      // import("@codingame/monaco-vscode-json-default-extension"),
    ])

    setIsReady(true)

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
