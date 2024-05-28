import { styled } from "styled-system/jsx"
import { createEffect, untrack } from "solid-js"
import { escape } from "html-escaper"
import { useContent } from "./context/new-document"

const formatHTML = (plainText: string) =>
  plainText
    .split("\n")
    .map((line) => {
      const trimmed = line.trim()
      return trimmed === "" ? `<br/>` : `<p>${escape(trimmed)}</p>`
    })
    .join("\n")

const TextArea = styled("div", {
  base: {
    textStyle: "md",
    px: "10",
    py: "5",
    _focus: {
      outline: "none",
    },
    _empty: {
      _after: {
        content: '"Paste the document to be translated here"',
        opacity: 0.3,
      },
    },
  },
})

export function DocumentInputArea() {
  let ref!: HTMLDivElement

  const [content, setContent] = useContent()

  createEffect(() => {
    if (ref == null) return
    untrack(() => {
      ref.contentEditable = "true"
      if (content() !== "") ref.innerHTML = formatHTML(content())
    })
  })

  return (
    <TextArea
      ref={ref}
      onPaste={(e: ClipboardEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const text = e.clipboardData?.getData("text/plain") ?? ""

        if (e.target instanceof HTMLDivElement) {
          // e.target.innerHTML = text ?? ""
          document.execCommand("insertHTML", false, formatHTML(text))
        }
      }}
      onInput={(e) => {
        setContent(e.target.textContent ?? "")
      }}
    />
  )
}
