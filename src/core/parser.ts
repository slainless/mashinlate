import type { Line, Document, Service } from "./document"
import type { TranslationOptions } from "./translation-services/service"

export function parseLine(line: string, __index: string | number): Line {
  const index = +__index
  if (line === "") return { index, type: "br" } satisfies Line.Br
  return {
    index,
    type: "string",
    content: line,
  } satisfies Line.String
}

export function createDocument(
  plainText: string,
  opts: TranslationOptions,
  services: Service[],
): Document {
  return {
    id: crypto.randomUUID(),
    text: plainText,
    lines: plainText.split("\n").map(parseLine),
    results: {},
    services: Object.fromEntries(
      services.map((service) => [service.id, service]),
    ),
    ...opts,
  }
}

export interface Fragment {
  lines: Line[]
  length: number
  overLimit: boolean
}

export function fragmentizeLines(lines: Line[], limit = 512) {
  const fragments: Fragment[] = []

  let length = 0
  let lastIndex = 0
  for (const index in lines) {
    const line = lines[index]
    const lineLen = line.type == "br" ? 1 : line.content.length

    if (length + lineLen >= limit) {
      if (length === 0) {
        fragments.push({ lines: [line], length: lineLen, overLimit: true })
        lastIndex = line.index + 1
        continue
      }

      fragments.push({
        lines: lines.slice(lastIndex, line.index + 1),
        length,
        overLimit: false,
      })
      lastIndex = line.index + 1
      length = 0
    }

    length += lineLen
  }

  if (lastIndex < lines.length)
    fragments.push({
      lines: lines.slice(lastIndex),
      length,
      overLimit: length >= limit,
    })

  return fragments
}
