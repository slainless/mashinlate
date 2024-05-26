import { createEffect } from "solid-js"
import { isServer } from "solid-js/web"

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
