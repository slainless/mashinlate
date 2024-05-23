export namespace Line {
  export interface Generic {
    type: string
    index: number
  }

  export interface Br extends Generic {
    type: "br"
  }

  export interface String extends Generic {
    type: "string"
    content: string
  }
}

export type Line = Line.String | Line.Br

export const enum ServiceType {
  MTL = "mtl",
  LLM = "llm"
}

export interface Service {
  id: string

  serviceName: string
  type: ServiceType
}

export interface History {
  service: Service
  translations: {
    [I: string]: string[]
  }
}

export interface Document {
  text: string
  lines: Line[]
  translations: History[]
}