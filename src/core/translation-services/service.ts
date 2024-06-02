import type { SourceLanguageCode, TargetLanguageCode } from "deepl-node"
import { type Service, ServiceType } from "../document"
import type { Constructor } from "type-fest"

export interface TranslationOptions {
  from: SourceLanguageCode
  to: TargetLanguageCode
}

export interface InstantiableService {
  new (...args: any[]): TranslationService
  from(init?: any, id?: string): TranslationService

  serviceName: string
}

export abstract class TranslationService implements Service {
  id: string

  abstract init?: any

  abstract serviceName: string
  abstract type: ServiceType

  constructor(id?: string) {
    this.id = id ?? crypto.randomUUID()
  }

  abstract translate(text: string, opts: TranslationOptions): Promise<string>
}
