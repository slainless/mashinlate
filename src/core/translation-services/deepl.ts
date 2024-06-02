import { Translator, type TranslateTextOptions } from "deepl-node"
import { ServiceType } from "../document"
import { type TranslationOptions, TranslationService } from "./service"
import { AvailableServices } from "../service-registry"

export type DeepLInit = TranslateTextOptions & {
  authKey: string
}

export class DeepLService extends TranslationService {
  static serviceName = AvailableServices.DeepL
  serviceName = DeepLService.serviceName

  type = ServiceType.MTL

  private translator: Translator

  init: DeepLInit

  constructor(init: DeepLInit, id?: string) {
    super(id)
    this.translator = new Translator(init.authKey)
    this.init = init
  }

  static from(init?: DeepLInit, id?: string) {
    if (init?.authKey == null || init?.authKey == "")
      throw new TypeError("No Auth key found for DeepL!")

    return new DeepLService(init, id)
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await this.translator.translateText(
      text,
      opts.from,
      opts.to,
      this.init,
    )
    return result.text
  }
}
