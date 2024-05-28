import type { TargetLanguageCode, SourceLanguageCode } from "deepl-node"
import {
  createContext,
  createSignal,
  useContext,
  type ParentProps,
} from "solid-js"

export const NewDocumentContext = createContext({
  content: createSignal(""),
  from: createSignal<SourceLanguageCode>(),
  to: createSignal<TargetLanguageCode>(),
})

export function NewDocumentProvider(props: ParentProps) {
  const content = createSignal("")
  const from = createSignal<SourceLanguageCode>()
  const to = createSignal<TargetLanguageCode>()

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

export function useSourceLanguage() {
  return useNewDocument().from
}

export function useTargetLanguage() {
  return useNewDocument().to
}
