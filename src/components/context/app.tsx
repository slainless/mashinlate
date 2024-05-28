import { createAsync } from "@solidjs/router"
import {
  createContext,
  createEffect,
  createSignal,
  useContext,
  type ParentComponent,
} from "solid-js"
import { createStore, produce } from "solid-js/store"
import { isServer } from "solid-js/web"
import { lenientLoadAppCtx, type AppContext } from "~/core/app"
import { createDB, type Database, loadFromDB } from "~/core/data"
import type { Document } from "~/core/document"
import { syncWithLocalStorage } from "~/lib/sync-store"

export interface DataStore {
  documents: Document[] | undefined
}

export const AppStoreContext = createContext({
  ctxStore: createStore<AppContext>({
    activeDocument: undefined,
    database: undefined,
  }),
  dataStore: createStore<DataStore>({
    documents: undefined,
  }),
  database: createSignal<Database>()[0],

  async pushDocument(document: Document) {
    return -1
  },
})

export interface AppStoreProviderProps {}

const localStorageKey = "app_data"
export const AppStoreProvider: ParentComponent<AppStoreProviderProps> = (
  props,
) => {
  const [appCtxStore, setAppCtxStore] = syncWithLocalStorage(
    createStore(lenientLoadAppCtx(localStorageKey)),
    localStorageKey,
  )
  const [database, setDatabase] = createSignal<Database>()

  createEffect(() => {
    createDB(appCtxStore.database).then((db) => {
      setDatabase(db)
    })
  })

  const documentsFromDB = createAsync(() => loadFromDB(database()))
  const [dataStore, setDataStore] = createStore<DataStore>({
    documents: undefined,
  })

  createEffect(() => {
    const __data = documentsFromDB()
    if (__data != null)
      setDataStore("documents", () => documentsFromDB()?.documents)
  })

  return (
    <AppStoreContext.Provider
      value={{
        ctxStore: [appCtxStore, setAppCtxStore],
        dataStore: [dataStore, setDataStore],
        database,

        async pushDocument(document) {
          if (database() == null)
            throw new Error("AppStore: database failed to load")
          if (dataStore.documents == null)
            throw new TypeError("AppStore: documents is null")

          setDataStore(
            "documents",
            produce((documents) => {
              documents!.push(document)
            }),
          )

          await database()!.documents.put(document)
          return dataStore.documents!.length + 1
        },
      }}
    >
      {props.children}
    </AppStoreContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppStoreContext)
}

export function useDataStore() {
  return useAppContext().dataStore
}
