export function Implements<T>() {
  return <U extends T>(c: U) => {}
}

export function Nullable<T>(v: T): T | undefined {
  return v
}
