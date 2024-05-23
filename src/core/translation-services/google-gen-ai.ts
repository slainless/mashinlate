import { ServiceType } from '../document'
import { TranslationOptions, TranslationService } from './service'
import { render } from 'micromustache'
import { GoogleGenerativeAI, GenerativeModel, ModelParams } from '@google/generative-ai'

export const defaultSystemMessage = 
  `You have to translate the document below from {{from}} to {{to}} with some constraint:\n` + 
  `- Since your answer will be fed to a system as API response, no extranous response allowed except the direct translation of the document.\n` +
  `- Don't omit any newline since it's important even if it seems extranous.\n` +
  `- Produce translation as faithful to the document as possible.\n` +
  `Here is the document:`

export class GoogleGenerativeAIService extends TranslationService {
  serviceName = "google-generative-ai"
  type = ServiceType.LLM

  private api: GenerativeModel
  systemMessage: string

  constructor(apiKey: string, opts?: Omit<ModelParams, "model"> & { systemMessage?: string }, id?: string) {
    super(id)
    this.systemMessage = opts?.systemMessage ?? defaultSystemMessage
    const ai = new GoogleGenerativeAI(apiKey)
    this.api = ai.getGenerativeModel({ model: "gemini-1.0-pro", ...opts })
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await this.api.generateContent(render(this.systemMessage, { from: opts.from, to: opts.to }) + text)
    return result.response.text()
  }
}