import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import { isServer } from "solid-js/web"
import { serialize } from "seroval"

export function syncWithLocalStorage<
  T extends [store: any, setter: (...args: any) => void],
>(store: T, key: string): T {
  const [value] = store

  createEffect(() => {
    if (isServer) {
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  })

  return store
}
