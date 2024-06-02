import { ChatGPTAPI, type ChatGPTAPIOptions } from "chatgpt"
import { ServiceType } from "../document"
import { type TranslationOptions, TranslationService } from "./service"
import { render } from "micromustache"
import { AvailableServices } from "../service-registry"

export const defaultSystemMessage =
  `You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.` +
  `You have to translate the document below from {{from}} to {{to}} with some constraint:\n` +
  `- Since your answer will be fed to a system as API response, no extranous response allowed except the direct translation of the document.\n` +
  `- Don't omit any newline since it's important even if it seems extranous.\n` +
  `- Produce translation as faithful to the document as possible.\n` +
  `Here is the document:`

export type ChatGPTInit = ChatGPTAPIOptions

export class ChatGPTService extends TranslationService {
  static serviceName = AvailableServices.ChatGPT
  serviceName = ChatGPTService.serviceName

  type = ServiceType.LLM

  private api: ChatGPTAPI

  init: ChatGPTInit

  constructor(init: ChatGPTInit, id?: string) {
    super(id)
    const __init = Object.assign({ systemMessage: defaultSystemMessage }, init)

    this.api = new ChatGPTAPI(__init)
    this.init = __init
  }

  static from(init?: ChatGPTInit, id?: string) {
    if (init?.apiKey == null || init?.apiKey == "")
      throw new TypeError("No API key found for ChatGPT!")

    return new ChatGPTService(init, id)
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await this.api.sendMessage(text, {
      systemMessage: render(this.init.systemMessage!, {
        from: opts.from,
        to: opts.to,
      }),
    })
    return result.text
  }
}
