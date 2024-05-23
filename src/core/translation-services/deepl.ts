import { Translator, TranslateTextOptions } from 'deepl-node'
import { ServiceType } from '../document'
import { TranslationOptions, TranslationService } from './service'

export class DeepLService extends TranslationService {
  serviceName = "deepl"
  type = ServiceType.MTL

  private translator: Translator

  constructor(authKey: string, private options?: TranslateTextOptions, id?: string) {
    super(id)
    this.translator = new Translator(authKey)
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await this.translator.translateText(text, opts.from, opts.to, this.options)
    return result.text
  }
}