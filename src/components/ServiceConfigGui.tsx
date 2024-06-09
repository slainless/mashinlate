import { AvailableServices } from "~/core/service-registry"
import { GuiRenderer, type GuiComponent, type GuiSchema } from "./GuiRenderer"

export const servicesConfigSchema = {
  [AvailableServices.ChatGPT]: [
    {
      type: "string",
      key: "apiKey",
      label: "API Key",
      // placeholder: "API Key used to access OpenAI API",
    },
    { type: "separator" },
    {
      type: "text",
      key: "systemMessage",
      label: "System Message",
      placeholder: "Message to be prefixed into every generation call",
    },
  ],
  [AvailableServices.ChatGPTUnofficialProxy]: [
    {
      type: "string",
      key: "accessToken",
      label: "Access Token",
      // placeholder: "Access token used to access ChatGPT website",
    },
    { type: "separator" },
    {
      type: "text",
      key: "systemMessage",
      label: "System Message",
      placeholder: "Message to be prefixed into every generation call",
    },
  ],
  [AvailableServices.DeepL]: [
    { type: "string", key: "authKey", label: "Auth Key" },
  ],
  [AvailableServices.GoogleGenerativeAI]: [
    { type: "string", key: "apiKey", label: "API Key" },
    { type: "separator" },
    {
      type: "text",
      key: "systemMessage",
      label: "System Message",
      placeholder: "Message to be prefixed into every generation call",
    },
  ],
  [AvailableServices.GoogleTranslate]: [],
} satisfies Record<AvailableServices, GuiComponent[]>

export interface ServiceConfigGuiProps<T extends AvailableServices> {
  service: T
  onChange?: (changes: GuiSchema<(typeof servicesConfigSchema)[T]>) => void
}
export function ServiceConfigGui<T extends AvailableServices>(
  props: ServiceConfigGuiProps<T>,
) {
  return (
    <GuiRenderer
      schema={servicesConfigSchema[props.service]}
      onChange={props.onChange}
    />
  )
}
