import { AvailableServices } from "~/core/service-registry"

const service = (title: string, desc?: string) => ({
  title,
  desc,
})
export const availableServices = {
  [AvailableServices.ChatGPT]: service(
    "ChatGPT",
    "Uses the latest official ChatGPT API (Supports v4 and Turbo)",
  ),
  [AvailableServices.GoogleGenerativeAI]: service(
    "Google Generative AI",
    "Uses Google Generative AI with Gemini Pro 1.0 model",
  ),
  [AvailableServices.ChatGPTUnofficialProxy]: service(
    "Unofficial ChatGPT Proxy",
    "Uses proxied public web-based ChatGPT services",
  ),
  [AvailableServices.GoogleTranslate]: service(
    "Google Translate",
    "Uses Google Translate API",
  ),
  [AvailableServices.DeepL]: service("DeepL", "Uses DeepL API"),
}
