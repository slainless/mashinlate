import { AvailableServices } from "~/core/service-registry"

const service = (id: AvailableServices, title: string, desc?: string) => ({
  id,
  title,
  desc,
})
export const availableServices = [
  service(
    AvailableServices.ChatGPT,
    "ChatGPT",
    "Uses the latest official ChatGPT API (Supports v4 and Turbo)",
  ),
  service(
    AvailableServices.GoogleGenerativeAI,
    "Google Generative AI",
    "Uses Google Generative AI with Gemini Pro 1.0 model",
  ),
  service(
    AvailableServices.ChatGPTUnofficialProxy,
    "Unofficial ChatGPT Proxy",
    "Uses proxied public web-based ChatGPT services",
  ),
  service(
    AvailableServices.GoogleTranslate,
    "Google Translate",
    "Uses Google Translate API",
  ),
  service(AvailableServices.DeepL, "DeepL", "Uses DeepL API"),
]
