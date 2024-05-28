import type { TargetLanguageCode, SourceLanguageCode } from "deepl-node"
import {
  createContext,
  createSignal,
  useContext,
  type ParentProps,
} from "solid-js"

export const NewDocumentContext = createContext({
  content: createSignal(""),
  from: createSignal<SourceLanguageCode>("en"),
  to: createSignal<TargetLanguageCode>("en-US"),
})

export function NewDocumentProvider(props: ParentProps) {
  const content = createSignal("")
  const from = createSignal<SourceLanguageCode>("en")
  const to = createSignal<TargetLanguageCode>("en-US")

  return (
    <NewDocumentContext.Provider value={{ content, from, to }}>
      {props.children}
    </NewDocumentContext.Provider>
  )
}

export function useNewDocument() {
  return useContext(NewDocumentContext)
}

export function useContent() {
  return useNewDocument().content
}
