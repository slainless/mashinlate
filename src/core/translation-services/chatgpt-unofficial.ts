import { ChatGPTUnofficialProxyAPI } from "chatgpt"
import { ServiceType } from "../document"
import { type TranslationOptions, TranslationService } from "./service"
import { render } from "micromustache"

export const defaultSystemMessage =
  `You have to translate the document below from {{from}} to {{to}} with some constraint:\n` +
  `- Since your answer will be fed to a system as API response, no extranous response allowed except the direct translation of the document.\n` +
  `- Don't omit any newline since it's important even if it seems extranous.\n` +
  `- Produce translation as faithful to the document as possible.\n` +
  `Here is the document:\n`

export type ChatGPTUnofficialInit = ConstructorParameters<
  typeof ChatGPTUnofficialProxyAPI
>[0] & {
  systemMessage?: string
}

export class ChatGPTUnofficialService extends TranslationService {
  static serviceName = "chatgpt-unofficial"
  serviceName = ChatGPTUnofficialService.serviceName

  type = ServiceType.LLM

  private api: ChatGPTUnofficialProxyAPI

  init: ChatGPTUnofficialInit

  constructor(init: ChatGPTUnofficialInit, id?: string) {
    super(id)
    const __init = Object.assign({ systemMessage: defaultSystemMessage }, init)

    this.api = new ChatGPTUnofficialProxyAPI(__init)
    this.init = __init
  }

  static from(init?: ChatGPTUnofficialInit, id?: string) {
    if (init?.accessToken == null || init?.accessToken == "")
      throw new TypeError("No Auth key found for DeepL!")

    return new ChatGPTUnofficialService(init, id)
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await this.api.sendMessage(
      render(this.init.systemMessage!, { from: opts.from, to: opts.to }) + text,
    )
    return result.text
  }
}
