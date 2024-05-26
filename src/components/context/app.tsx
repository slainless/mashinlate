import { createAsync } from "@solidjs/router"
import type Dexie from "dexie"
import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  useContext,
  type Accessor,
  type ParentComponent,
} from "solid-js"
import { createStore, produce } from "solid-js/store"
import { loadAppContext, type AppContext } from "~/core/app"
import {
  createDB,
  type Database,
  loadData,
  writeData,
  type Data,
} from "~/core/data"
import { syncWithLocalStorage } from "~/lib/sync-store"
import { Nullable } from "~/lib/type-helper"

export const AppStoreContext = createContext({
  context: createStore<AppContext>({
    activeDocument: undefined,
    database: undefined,
  }),
  data: createSignal(
    Nullable(
      createStore<Data>({
        documents: [],
      }),
    ),
  )[0],
  database: createSignal<Database>()[0],
})

export interface AppStoreProviderProps {}

const localStorageKey = "app_data"
export const AppStoreProvider: ParentComponent<AppStoreProviderProps> = (
  props,
) => {
  const contextStore = syncWithLocalStorage(
    createStore(loadAppContext(localStorageKey)),
    localStorageKey,
  )
  const [context] = contextStore

  const [database, setDatabase] = createSignal<Database>()

  createEffect(() => {
    createDB(context.database).then((db) => {
      setDatabase(db)
    })
  })

  const data = createAsync(() => loadData(database()))
  const dataStore = createMemo(() => {
    const __data = data()
    if (__data == null) return
    return createStore(__data)
  })

  return (
    <AppStoreContext.Provider
      value={{ context: contextStore, data: dataStore, database }}
    >
      {props.children}
    </AppStoreContext.Provider>
  )
}

function context() {
  return useContext(AppStoreContext)
}

export function useDocuments() {
  return context().data()?.[0].documents
}
