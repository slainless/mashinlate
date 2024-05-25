import { action } from "@solidjs/router"
import type { Line, Service } from "../document"
import type { Fragment } from "../parser"
import { createTranslationServiceMap } from "~/lib/general-util"
import { GoogleGenerativeAIService } from "../translation-services/google-gen-ai"
import { GoogleTranslateService } from "../translation-services/google"
import { DeepLService } from "../translation-services/deepl"
import { ChatGPTService } from "../translation-services/chatgpt"
import { ChatGPTUnofficialService } from "../translation-services/chatgpt-unofficial"
import { translate } from "../server/translate"
import type { TranslationOptions } from "../translation-services/service"

const serviceMap = createTranslationServiceMap([
  GoogleGenerativeAIService,
  GoogleTranslateService,
  DeepLService,
  ChatGPTService,
  ChatGPTUnofficialService,
])

const __translate = action(
  (
    line: Line.String | Fragment,
    service: Service,
    opts: TranslationOptions,
  ): Promise<string | Record<number, string>> => {
    "use server"
    const __service = serviceMap[service.serviceName]
    if (__service == null)
      throw new Response("Unknown service", { status: 400 })

    const tlService = __service.from(service.init, service.id)
    return translate(line, tlService, opts)
  },
)

export { __translate as translate }
