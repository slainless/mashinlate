import type { InstantiableService } from "~/core/translation-services/service"

export function createTranslationServiceMap(services: InstantiableService[]) {
  return Object.fromEntries(
    services.map((service) => [service.serviceName, service]),
  )
}
