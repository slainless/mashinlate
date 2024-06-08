import type { Meta, StoryObj } from "storybook-solidjs"
import { ServiceList, type OrderChange } from "./ServiceList"
import { AvailableServices } from "~/core/service-registry"
import { ServiceType, type Service } from "~/core/document"
import { css } from "styled-system/css"
import { fn } from "@storybook/test"
import { createStore, produce } from "solid-js/store"
import { createEffect, createMemo, untrack } from "solid-js"

const meta: Meta<typeof ServiceList> = {
  component: ServiceList,
  decorators: [
    (Story) => (
      <div class={css({ maxW: "500px" })}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ServiceList>

const exampleServices = [
  {
    id: crypto.randomUUID(),
    serviceName: AvailableServices.ChatGPT,
    type: ServiceType.LLM,
  },
  {
    id: crypto.randomUUID(),
    serviceName: AvailableServices.GoogleGenerativeAI,
    type: ServiceType.LLM,
  },
  {
    id: crypto.randomUUID(),
    serviceName: AvailableServices.GoogleTranslate,
    type: ServiceType.MTL,
  },
  {
    id: crypto.randomUUID(),
    serviceName: AvailableServices.DeepL,
    type: ServiceType.MTL,
  },
]
export const Default: Story = {
  args: {
    services: exampleServices,
    onOrderChange: fn(),
  },
}

export const SelfContained: Story = {
  render: (args, ctx) => {
    const [services, setServices] = createStore<Record<string, Service>>(
      Object.fromEntries(
        exampleServices.map((service) => [service.id, service]),
      ),
    )

    createEffect(() => {
      untrack(() => {
        setServices(
          produce((services) => {
            const ordered: Service[] = []
            const list = Object.values(services)
            for (const service of list) {
              if (
                service.order == null ||
                isNaN(service.order) ||
                (service.order != null &&
                  (service.order < 0 || service.order >= list.length))
              ) {
                services[service.id].order = ordered.length
                ordered.push(service)
              } else if (
                service.order != null &&
                ordered[service.order] != null
              ) {
                const fi = ordered[service.order]
                services[fi.id].order = ordered.length
                ordered.push(fi)
                ordered[service.order] = service
              } else {
                ordered[service.order] = service
              }
            }
          }),
        )
      })
    })

    const orderedServices = createMemo(() =>
      Object.entries(services)
        .map((v, i) => [v[1].order ?? i, v[1]] as const)
        .sort((a, b) => a[0] - b[0])
        .map((v) => v[1]),
    )

    const handler = (change: OrderChange) => {
      if (change.from.order === change.to.order) return
      const current = orderedServices()
      setServices(
        produce((services) => {
          services[change.from.id].order = change.to.order
          // services[change.to.id].order = change.from.order
          if (change.from.order > change.to.order) {
            for (let i = change.to.order; i < change.from.order; i++)
              services[current[i].id].order = i + 1
          } else {
            for (let i = change.from.order + 1; i <= change.to.order; i++)
              services[current[i].id].order = i - 1
          }
        }),
      )
    }

    return <ServiceList services={orderedServices()} onOrderChange={handler} />
  },
}
