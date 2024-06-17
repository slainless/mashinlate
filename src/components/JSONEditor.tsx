import { createEffect, createSignal, on, type ComponentProps } from "solid-js"
import { css, cx } from "styled-system/css"
import { useMonacoModule, useMonacoReady } from "./MonacoProvider"
import { isServer } from "solid-js/web"
import { createLogger } from "~/core/pino"
import { usePreferredTheme } from "./ThemeProvider"
import { Theme } from "~/core/theme"
import type { editor } from "monaco-editor"
import { nanoid } from "nanoid"

export interface JSONEditorProps extends ComponentProps<"div"> {}
export function JSONEditor(props: JSONEditorProps) {
  const { id, class: className, ...restProps } = props
  const $id = id == null ? `json-editor-${nanoid(4)}` : id

  const logger = createLogger(JSONEditor)

  const isMonacoReady = useMonacoReady()
  const monacoEditor = useMonacoModule()

  const [mountedEditor, setMountedEditor] =
    createSignal<editor.IStandaloneCodeEditor>()

  const theme = usePreferredTheme()

  createEffect(
    on([isMonacoReady, monacoEditor], () => {
      if (isServer) return
      if (isMonacoReady() == false) return
      if (monacoEditor() == null) return
      if (
        self.MonacoEnvironment == null ||
        self.MonacoEnvironment["getWorker"] == null
      ) {
        logger().warn(
          "Monaco environment is not defined despite the status being ready. Possibly caused by bug",
        )
        return
      }

      logger().debug("Monaco environment ready")

      mountedEditor()?.dispose()
      setMountedEditor(
        monacoEditor()!.editor.create(document.getElementById($id)!, {
          language: "json",
          minimap: {
            enabled: false,
          },
          // automaticLayout: true,
        }),
      )

      logger().debug("Editor created")

      return () => {
        mountedEditor()?.dispose()
        setMountedEditor(undefined)
      }
    }),
  )

  createEffect(() => {
    monacoEditor()?.editor.setTheme(theme() === Theme.Dark ? "vs-dark" : "vs")
  })

  return (
    <div
      id={$id}
      class={cx(
        css({
          height: "100%",
          minH: "240px",
        }),
        className,
      )}
      {...restProps}
    ></div>
  )
}
