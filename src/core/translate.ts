import { Line } from './document'
import { Fragment } from './parser'
import { TranslationService, TranslationOptions as __TranslateOptions } from './translation-services/service'

function trimLines(lines: Line[]): Line[] {
  let start = 0, end = lines.length
  for(; start <= lines.length; start++)
    if(start === lines.length) return []
    else if(lines[start].type == 'br') continue
    else break

  for(; end >= 0; end--)
    if(end === 0) return []
    else if(lines[end - 1].type == 'br') continue
    else break

  return lines.slice(start, end)
}

function applyGlossaries(text: string, glossaries?: Map<string | RegExp, string>): string {
  if(glossaries == null || glossaries.size === 0) return text
  
  let newText = text
  for(const [lookup, replacement] of Object.entries(glossaries))
    newText = newText.replaceAll(lookup, replacement)

  return newText
}

export class FragmentTranslationError extends Error {
  name = "FragmentTranslationError"

  constructor(message: string, public fragment: Fragment, public result?: Record<number, string>) {
    super(message)
  }
}

export interface TranslateOptions extends __TranslateOptions {
  glossaries?: Map<string | RegExp, string>
}
export async function translate(line: Line.String, service: TranslationService, opts: TranslateOptions): Promise<string>
export async function translate(fragment: Fragment, service: TranslationService, opts: TranslateOptions): Promise<Record<number, string>>
export async function translate(
  input: Fragment | Line.String, 
  service: TranslationService,
  opts: TranslateOptions
): Promise<string | Record<number, string>> {
  let trimmedLines: Line[]

  let text: string
  if("type" in input) {
    text = input.content
  } else {
    trimmedLines = trimLines(input.lines)
    text = trimmedLines.map(line => line.type == "br" ? "" : line.content).join("\n")
  }

  const result = await service.translate(applyGlossaries(text, opts.glossaries), opts)
  if("type" in input)
    return result

  const splitted = result.split("\n")
  if(splitted.length !== trimmedLines!.length)
    throw new FragmentTranslationError("Mismatching length between fragment lines and translation results", input, result)

  const resultMapped: Record<number, string> = {}
  for(const [index, line] of Object.entries(trimmedLines!))
    resultMapped[line.index] = splitted[+index]

  return resultMapped
}