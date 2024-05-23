import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { ServiceType } from '../document'
import { TranslationOptions, TranslationService } from './service'
import { render } from 'micromustache'

export const defaultSystemMessage = 
  `You have to translate the document below from {{from}} to {{to}} with some constraint:\n` + 
  `- Since your answer will be fed to a system as API response, no extranous response allowed except the direct translation of the document.\n` +
  `- Don't omit any newline since it's important even if it seems extranous.\n` +
  `- Produce translation as faithful to the document as possible.\n` +
  `Here is the document:\n`

export type ChatGPTUnofficialProxyAPIOptions = Omit<ConstructorParameters<typeof ChatGPTUnofficialProxyAPI>[0], "apiKey">
export class ChatGPTUnofficialService extends TranslationService {
  serviceName = "chatgpt-unofficial"
  type = ServiceType.LLM

  private api: ChatGPTUnofficialProxyAPI
  systemMessage: string

  constructor(accessToken: string, opts?: Omit<ChatGPTUnofficialProxyAPIOptions, "accessToken"> & {
    systemMessage?: string
  }, id?: string) {
    super(id)
    this.systemMessage = opts?.systemMessage ?? defaultSystemMessage
    this.api = new ChatGPTUnofficialProxyAPI({
      accessToken,
      ...opts,
    })
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await this.api.sendMessage(
      render(this.systemMessage, { from: opts.from, to: opts.to }) + text
    )
    return result.text
  }
}