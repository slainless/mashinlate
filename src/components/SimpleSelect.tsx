import { Check, ChevronsUpDown } from "lucide-solid"
import { Index, Show, type ComponentProps } from "solid-js"
import { Select, SelectRoot } from "./base/select"

export interface ISelectItem {
  label: string
  value: string
  disabled?: boolean
}
export interface SimpleSelectProps extends ComponentProps<typeof SelectRoot> {
  label?: string
  placeholder: string

  items: Array<ISelectItem>
}
export function SimpleSelect(props: SimpleSelectProps) {
  return (
    <Select positioning={{ sameWidth: true }} {...props}>
      <Show when={!!props.label}>
        <Select.Label>{props.label}</Select.Label>
      </Show>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText>{props.placeholder}</Select.ValueText>
          <ChevronsUpDown />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content maxH="50vh" overflowY="auto">
          <Select.ItemGroup>
            <Index each={props.items}>
              {(item) => (
                <Select.Item item={item()}>
                  <Select.ItemText>{item().label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check />
                  </Select.ItemIndicator>
                </Select.Item>
              )}
            </Index>
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select>
  )
}
