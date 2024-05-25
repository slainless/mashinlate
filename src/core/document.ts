import { Type, type Static } from "@sinclair/typebox"
import type { SourceLanguageCode, TargetLanguageCode } from "deepl-node"
import type { Simplify } from "type-fest"

export enum ServiceType {
  MTL = "mtl",
  LLM = "llm",
}

export namespace Schema {
  export namespace Line {
    export const Generic = Type.Object({
      type: Type.String(),
      index: Type.Number(),
    })

    export const Br = Type.Intersect([
      Generic,
      Type.Object({
        type: Type.Literal("br"),
      }),
    ])

    export const String = Type.Intersect([
      Generic,
      Type.Object({
        type: Type.Literal("string"),
        content: Type.String(),
      }),
    ])
  }

  export const Service = Type.Object({
    id: Type.String(),

    serviceName: Type.String(),
    type: Type.Enum(ServiceType),

    init: Type.Optional(Type.Record(Type.String(), Type.Any())),
  })

  export const Result = Type.Record(Type.Number(), Type.Array(Type.String()))

  export const Document = Type.Object({
    id: Type.String(),

    text: Type.String(),
    lines: Type.Array(Line.Generic),
    results: Type.Record(Type.String(), Result),
    services: Type.Record(Type.String(), Service),

    from: Type.String(),
    to: Type.String(),
  })
}

export namespace Line {
  export type Generic = Static<typeof Schema.Line.Generic>
  export type Br = Simplify<Static<typeof Schema.Line.Br>>
  export type String = Simplify<Static<typeof Schema.Line.String>>
}

export type Line = Line.String | Line.Br
export type Service = Static<typeof Schema.Service>
export type Document = Static<typeof Schema.Document>
