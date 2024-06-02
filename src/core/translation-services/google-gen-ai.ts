import { ServiceType } from "../document"
import { type TranslationOptions, TranslationService } from "./service"
import { render } from "micromustache"
import {
  GoogleGenerativeAI,
  GenerativeModel,
  type ModelParams,
} from "@google/generative-ai"
import { AvailableServices } from "../service-registry"

export const defaultSystemMessage =
  `You have to translate the document below from {{from}} to {{to}} with some constraint:\n` +
  `- Since your answer will be fed to a system as API response, no extranous response allowed except the direct translation of the document.\n` +
  `- Don't omit any newline since it's important even if it seems extranous.\n` +
  `- Produce translation as faithful to the document as possible.\n` +
  `Here is the document:`

export type GoogleGenerativeAIInit = Omit<ModelParams, "model"> & {
  apiKey: string
  systemMessage?: string
}

export class GoogleGenerativeAIService extends TranslationService {
  static serviceName = AvailableServices.GoogleGenerativeAI
  serviceName = GoogleGenerativeAIService.serviceName

  type = ServiceType.LLM

  private api: GenerativeModel

  init: GoogleGenerativeAIInit

  constructor(init: GoogleGenerativeAIInit, id?: string) {
    super(id)
    const __init = Object.assign({ systemMessage: defaultSystemMessage }, init)
    const ai = new GoogleGenerativeAI(__init.apiKey)

    this.init = __init
    this.api = ai.getGenerativeModel({ model: "gemini-1.0-pro", ...__init })
  }

  static from(init?: GoogleGenerativeAIInit, id?: string) {
    if (init?.apiKey == null || init?.apiKey == "")
      throw new TypeError("No API key found for Google Generative AI!")

    return new GoogleGenerativeAIService(init, id)
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await this.api.generateContent(
      render(this.init.systemMessage!, { from: opts.from, to: opts.to }) + text,
    )
    return result.response.text()
  }
}
