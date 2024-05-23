import { SourceLanguageCode, TargetLanguageCode } from "deepl-node"
import { Service, ServiceType } from "../document"

export interface TranslationOptions {
  from: SourceLanguageCode
  to: TargetLanguageCode
}

export abstract class TranslationService implements Service {
  id: string

  abstract serviceName: string
  abstract type: ServiceType

  constructor(id?: string) {
    this.id = id ?? crypto.randomUUID()
  }

  abstract translate(text: string, opts: TranslationOptions): Promise<string>
}
