import { styled } from "styled-system/jsx"
import { hstack, vstack } from "styled-system/patterns"
import { Button } from "./base/button"
import { createEffect, Show, type ComponentProps } from "solid-js"
import {
  useContent,
  useSourceLanguage,
  useTargetLanguage,
} from "./context/new-document"
import { ArrowRight, Languages } from "lucide-solid"
import { SimpleSelect, type ISelectItem } from "./SimpleSelect"
import { Separator } from "./base/separator"
import { sourceLanguageCode, targetLanguageCode } from "~/core/language"
import type { SourceLanguageCode, TargetLanguageCode } from "deepl-node"
import { useAppContext, useDataStore } from "./context/app"
import { createDocument } from "~/core/parser"

const regionalNames = new Intl.DisplayNames(["en"], { type: "language" })
const mapper = (code: string) =>
  ({ label: regionalNames.of(code) ?? "", value: code }) satisfies ISelectItem
const sorter = (a: ISelectItem, b: ISelectItem) =>
  b.label > a.label ? -1 : b.label === a.label ? 0 : 1

const sourceLanguage = sourceLanguageCode.map(mapper).sort(sorter)
const targetLanguage = targetLanguageCode.map(mapper).sort(sorter)

const Floater = styled("div", {
  base: {
    background: "bg.default",
    shadow: "sm",
    borderRadius: "sm",
    w: "max-content",
    p: "3",
    marginInlineStart: "10",
    display: "flex",
  },
})

export interface ConfirmFloaterProps extends ComponentProps<typeof Floater> {}
export function ConfirmFloater(props: ConfirmFloaterProps) {
  const [content, setContent] = useContent()
  const [sourceLang, setSourceLang] = useSourceLanguage()
  const [targetLang, setTargetLang] = useTargetLanguage()

  const { pushDocument, database, ctxStore } = useAppContext()
  const [appCtx, setAppCtx] = ctxStore

  const confirm = async () => {
    if (sourceLang() == null || targetLang() == null) return

    const newDocument = createDocument(
      content(),
      { from: sourceLang()!, to: targetLang()! },
      [],
    )
    await pushDocument(newDocument)
    setAppCtx("activeDocument", () => newDocument.id)
  }

  return (
    <Show when={content() !== ""}>
      <Floater {...props}>
        <div
          class={hstack({
            "& > *": {
              flexShrink: 0,
            },
          })}
        >
          <Languages size={18} />
          <SimpleSelect
            placeholder="From language"
            items={sourceLanguage}
            w={60}
            multiple={false}
            value={sourceLang() != null ? [sourceLang()!] : undefined}
            onValueChange={(details) =>
              setSourceLang(details.value[0] as SourceLanguageCode)
            }
          />
          <ArrowRight size={18} />
          <SimpleSelect
            placeholder="To language"
            items={targetLanguage}
            w={60}
            value={targetLang() != null ? [targetLang()!] : undefined}
            onValueChange={(details) =>
              setTargetLang(details.value[0] as TargetLanguageCode)
            }
          />
          <Separator orientation="vertical" />
          <Button
            size="sm"
            px="5"
            disabled={sourceLang() == null || targetLang() == null}
            onClick={confirm}
          >
            Confirm
          </Button>
        </div>
      </Floater>
    </Show>
  )
}
