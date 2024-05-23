import { ServiceType } from "../document"
import { TranslationOptions, TranslationService } from "./service"
import { translate } from "@vitalets/google-translate-api"

type GoogleTranslateOptions = Omit<
  NonNullable<Parameters<typeof translate>[1]>,
  "from" | "to"
>
export class GoogleTranslateService extends TranslationService {
  serviceName = "google-translate"
  type = ServiceType.MTL

  constructor(
    private options?: GoogleTranslateOptions,
    id?: string,
  ) {
    super(id)
  }

  async translate(text: string, opts: TranslationOptions): Promise<string> {
    const result = await translate(text, {
      ...opts,
      ...this.options,
    })
    return result.text
  }
}
