import {
  createEffect,
  For,
  type ComponentProps,
  type ParentProps,
} from "solid-js"
import { styled } from "styled-system/jsx"
import { Input } from "./base/input"
import { formLabel } from "styled-system/recipes"
import { css, cx } from "styled-system/css"
import { vstack } from "styled-system/patterns"
import { Textarea } from "./base/textarea"
import { createStore } from "solid-js/store"

export namespace GuiComponent {
  export interface Base {
    type: string
  }

  export interface Input extends Base {
    type: string
    key: string

    defaultValue?: any

    tooltipHelp?: string
    popoverHelp?: string

    label: string
    description?: string
  }

  interface LengthConstrained {
    minLength?: number
    maxLength?: number
  }

  export interface Separator extends Base {
    type: "separator"
    description?: string
  }

  export interface Label extends Base {
    type: "label"
    description?: string
  }

  export interface String extends Input, LengthConstrained {
    type: "string"
    placeholder?: string
    defaultValue?: string
  }

  export interface Text extends Input, LengthConstrained {
    type: "text"
    placeholder?: string
    defaultValue?: string
  }

  export interface Number extends Input {
    type: "number"
    min?: number
    max?: number
  }
}

type GuiComponentInputMap = {
  string: GuiComponent.String
  text: GuiComponent.Text
  number: GuiComponent.Number
}

type GuiComponentValue<T extends keyof GuiComponentInputMap> =
  GuiComponentInputMap[T]["defaultValue"]

export type GuiComponent =
  | GuiComponent.String
  | GuiComponent.Text
  | GuiComponent.Number
  | GuiComponent.Separator
  | GuiComponent.Label

export type GuiSchema<T extends readonly GuiComponent[]> = {
  [K in T[number] extends GuiComponent.Input
    ? T[number]["key"]
    : never]: T[number] extends GuiComponent.Input
    ? GuiComponentValue<
        (T[number] & { key: K } & { type: keyof GuiComponentInputMap })["type"]
      >
    : never
}

export interface GuiRendererProps<T extends GuiComponent[]> {
  schema: T
  onChange?: (value: GuiSchema<T>) => void
}

export function GuiRenderer<T extends GuiComponent[]>(
  props: GuiRendererProps<T>,
) {
  const [store, setStore] = createStore(
    Object.fromEntries(
      props.schema
        .map((schema) => {
          if ("key" in schema) {
            return [schema.key, schema.defaultValue]
          }
          return null
        })
        .filter((entry) => entry != null),
    ),
  )

  createEffect(() => {
    if (props.onChange == null) return
    props.onChange(store)
  })

  return (
    <Container>
      <For each={props.schema}>
        {(item, index) => {
          switch (item.type) {
            case "string":
              return (
                <InputContainer schema={item}>
                  <Input
                    placeholder={item.placeholder ?? item.label}
                    onChange={(v) => {
                      setStore(item.key, () => v.target.value)
                    }}
                    size="sm"
                    value={store[item.key]}
                  />
                </InputContainer>
              )
            case "text":
              return (
                <InputContainer schema={item}>
                  <Textarea
                    placeholder={item.placeholder ?? item.label}
                    onChange={(v) => {
                      setStore(item.key, () => v.target.value)
                    }}
                    value={store[item.key]}
                    size="sm"
                  />
                </InputContainer>
              )
          }
        }}
      </For>
    </Container>
  )
}

const Container = styled("div", {
  base: {
    // display: "grid",
    // gridTemplateColumns: "30% auto",
    display: "flex",
    flexDirection: "column",
    rowGap: "2",
  },
})

const InputContainer = (props: ParentProps<{ schema: GuiComponent.Input }>) => {
  return (
    <div class={vstack({ alignItems: "flex-start" })}>
      <label class={cx(formLabel())}>{props.schema.label}</label>
      {props.children}
    </div>
  )
}
