import { ChatGPTAPI, ChatGPTAPIOptions } from "chatgpt"
import { ServiceType } from "../document"
import { TranslationOptions, TranslationService } from "./service"
import { render } from "micromustache"

export const defaultSystemMessage =
  `You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.` +
  `You have to translate the document below from {{from}} to {{to}} with some constraint:\n` +
  `- Since your answer will be fed to a system as API response, no extranous response allowed except the direct translation of the document.\n` +
  `- Don't omit any newline since it's important even if it seems extranous.\n` +
  `- Produce translation as faithful to the document as possible.\n` +
  `Here is the document:`

export class ChatGPTService extends TranslationService {
  serviceName = "chatgpt"
  type = ServiceType.LLM

  private api: ChatGPTAPI
  systemMessage: string

  constructor(
    apiKey: string,
    options?: Omit<ChatGPTAPIOptions, "apiKey">,
    id?: string,
  ) {
    super(id)
    const { systemMessage, ...rest } = options ?? {}
    this.systemMessage = systemMessage ?? defaultSystemMessage
    this.api = new ChatGPTAPI({
      ...rest,
      apiKey,
    })
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await this.api.sendMessage(text, {
      systemMessage: render(this.systemMessage, {
        from: opts.from,
        to: opts.to,
      }),
    })
    return result.text
  }
}
