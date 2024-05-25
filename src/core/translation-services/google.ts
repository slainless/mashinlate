import { ServiceType } from "../document"
import { type TranslationOptions, TranslationService } from "./service"
import { translate } from "@vitalets/google-translate-api"

export type GoogleTranslateInit = Omit<
  NonNullable<Parameters<typeof translate>[1]>,
  "from" | "to"
>

export class GoogleTranslateService extends TranslationService {
  static serviceName = "google-translate"
  serviceName = GoogleTranslateService.serviceName

  type = ServiceType.MTL

  init?: GoogleTranslateInit

  constructor(init?: GoogleTranslateInit, id?: string) {
    super(id)
    this.init = init
  }

  static from(init?: GoogleTranslateInit, id?: string) {
    return new GoogleTranslateService(init, id)
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await translate(text, {
      ...opts,
      ...this.init,
    })
    return result.text
  }
}
