import type { Constructor } from "type-fest"

import chatGPTLogo from "../assets/ChatGPT_logo.svg"
import deepLLogo from "../assets/DeepL_logo.svg"
import geminiLogo from "../assets/Google_Gemini_logo.svg"
import googleTranslateLogo from "../assets/Google_Translate_logo.svg"
import { AvailableServices } from "~/core/service-registry"
import { styled } from "styled-system/jsx"
import { ark } from "@ark-ui/solid"
import { splitProps, type ComponentProps } from "solid-js"

const logoMap = {
  [AvailableServices.ChatGPT]: chatGPTLogo,
  [AvailableServices.GoogleGenerativeAI]: geminiLogo,
  [AvailableServices.ChatGPTUnofficialProxy]: chatGPTLogo,
  [AvailableServices.GoogleTranslate]: googleTranslateLogo,
  [AvailableServices.DeepL]: deepLLogo,
}

const Logo = styled(ark.img, {
  variants: {
    imageFilter: {
      brightenOnDark: {
        _dark: {
          filter: "brightness(3)",
        },
      },
      shift180: {
        filter: "hue-rotate(180deg)",
      },
    },
  },
})

export interface ServiceLogoProps extends ComponentProps<typeof Logo> {
  service: AvailableServices
}
export function ServiceLogo(props: ServiceLogoProps) {
  const [mainProps, restProps] = splitProps(props, ["service"])
  return (
    <Logo
      imageFilter={(() => {
        switch (mainProps.service) {
          case AvailableServices.DeepL:
            return "brightenOnDark"
          case AvailableServices.ChatGPTUnofficialProxy:
            return "shift180"
        }
        return undefined
      })()}
      src={logoMap[mainProps.service]}
      {...restProps}
    />
  )
}
