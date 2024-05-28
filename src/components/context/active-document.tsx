import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  useContext,
  type Accessor,
  type ParentComponent,
} from "solid-js"
import { produce } from "solid-js/store"
import type { Document, Line, Service } from "~/core/document"
import { AppStoreContext } from "./app"
import type { Fragment } from "~/core/parser"
import type { TranslationOptions } from "~/core/translation-services/service"
import { translate } from "~/core/actions/translate"

export interface ActiveDocument {
  document: Accessor<Document | undefined>

  // addService(id: string, service: Service): void
  // getService(id: string): Service | undefined
  // removeService(id: string): void

  translate(
    line: Line.String | Fragment,
    service: Service,
    opts: TranslationOptions,
  ): Promise<void>
}

export const ActiveDocumentContext = createContext<ActiveDocument>({
  document: createSignal<Document>()[0],
  // addService(id, service) {},
  // getService(id) {
  //   return undefined
  // },
  // removeService(id) {},
  async translate(line, service, opts) {},
} satisfies ActiveDocument)

export const ActiveDocumentProvider: ParentComponent = (props) => {
  const { ctxStore, dataStore, database } = useContext(AppStoreContext)

  const [appCtx] = ctxStore
  const [data, setData] = dataStore

  const document = createMemo(() => {
    if (data.documents == null || appCtx.activeDocument == null) return
    return data.documents[appCtx.activeDocument]
  })

  createEffect(() => {
    const db = database()
    const doc = document()

    if (db == null || doc == null) return
    db.documents.put(doc)
  })

  return (
    <ActiveDocumentContext.Provider
      value={{
        document,
        // getService(id) {
        //   return document()?.services[id]
        // },
        // addService(id, service) {
        //   if (document() == null)
        //     throw new Error(
        //       "ActiveDocument: attempt to add service to null document",
        //     )

        //   setData(
        //     "documents",
        //     appCtx.activeDocument!,
        //     "services",
        //     produce((record) => {
        //       record[id] = service
        //     }),
        //   )
        // },
        // removeService(id) {
        //   if (document() == null)
        //     throw new Error(
        //       "ActiveDocument: attempt to remove service from null document",
        //     )

        //   setData(
        //     "documents",
        //     appCtx.activeDocument!,
        //     "services",
        //     produce((record) => {
        //       delete record[id]
        //     }),
        //   )
        // },

        async translate(input, service, opts) {
          const __document = document()
          if (__document == null) {
            throw new Error(
              "ActiveDocument: attempt to translate null document",
            )
          }

          if (__document.results[service.id] == null)
            throw new TypeError("Attempting to use unregistered service")

          for (const line of "type" in input ? [input] : input.lines)
            if (__document.lines[line.index] !== line)
              throw new TypeError(
                "Attempting to translate line from another document!",
              )

          const result = await translate(input, service, opts)
          if ("type" in input && typeof result == "string") {
            setData(
              "documents",
              appCtx.activeDocument!,
              "results",
              produce((record) => {
                if (record[service.id] == null) record[service.id] = {}

                const svc = record[service.id]
                if (svc[input.index] == null) svc[input.index] = []
                else svc[input.index].push(result)
              }),
            )
          } else {
            setData(
              "documents",
              appCtx.activeDocument!,
              "results",
              produce((record) => {
                if (record[service.id] == null) record[service.id] = {}

                const svc = record[service.id]
                for (const [key, value] of Object.entries(result)) {
                  const index = +key
                  if (svc[index] == null) svc[index] = []
                  svc[index].push(value)
                }
              }),
            )
          }
        },
      }}
    >
      {props.children}
    </ActiveDocumentContext.Provider>
  )
}
