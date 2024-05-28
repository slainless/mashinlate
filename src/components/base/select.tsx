import { Select as __Select } from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { styled } from "styled-system/jsx"
import { select } from "styled-system/recipes"
import { createStyleContext } from "~/lib/create-style-context"

const { withProvider, withContext } = createStyleContext(select)

export const SelectRoot = withProvider(styled(__Select.Root), "root")
export const SelectClearTrigger = withContext(
  styled(__Select.ClearTrigger),
  "clearTrigger",
)
export const SelectContent = withContext(styled(__Select.Content), "content")
export const SelectControl = withContext(styled(__Select.Control), "control")
export const SelectIndicator = withContext(
  styled(__Select.Indicator),
  "indicator",
)
export const SelectItem = withContext(styled(__Select.Item), "item")
export const SelectItemGroup = withContext(
  styled(__Select.ItemGroup),
  "itemGroup",
)
export const SelectItemGroupLabel = withContext(
  styled(__Select.ItemGroupLabel),
  "itemGroupLabel",
)
export const SelectItemIndicator = withContext(
  styled(__Select.ItemIndicator),
  "itemIndicator",
)
export const SelectItemText = withContext(styled(__Select.ItemText), "itemText")
export const SelectLabel = withContext(styled(__Select.Label), "label")
export const SelectPositioner = withContext(
  styled(__Select.Positioner),
  "positioner",
)
export const SelectTrigger = withContext(styled(__Select.Trigger), "trigger")
export const SelectValueText = withContext(
  styled(__Select.ValueText),
  "valueText",
)

export interface RootProps extends ComponentProps<typeof SelectRoot> {}
export interface ClearTriggerProps
  extends ComponentProps<typeof SelectClearTrigger> {}
export interface ContentProps extends ComponentProps<typeof SelectContent> {}
export interface ControlProps extends ComponentProps<typeof SelectControl> {}
export interface IndicatorProps
  extends ComponentProps<typeof SelectIndicator> {}
export interface ItemProps extends ComponentProps<typeof SelectItem> {}
export interface ItemGroupProps
  extends ComponentProps<typeof SelectItemGroup> {}
export interface ItemGroupLabelProps
  extends ComponentProps<typeof SelectItemGroupLabel> {}
export interface ItemIndicatorProps
  extends ComponentProps<typeof SelectItemIndicator> {}
export interface ItemTextProps extends ComponentProps<typeof SelectItemText> {}
export interface LabelProps extends ComponentProps<typeof SelectLabel> {}
export interface PositionerProps
  extends ComponentProps<typeof SelectPositioner> {}
export interface TriggerProps extends ComponentProps<typeof SelectTrigger> {}
export interface ValueTextProps
  extends ComponentProps<typeof SelectValueText> {}

const Components = {
  ClearTrigger: SelectClearTrigger,
  Content: SelectContent,
  Control: SelectControl,
  Indicator: SelectIndicator,
  Item: SelectItem,
  ItemGroup: SelectItemGroup,
  ItemGroupLabel: SelectItemGroupLabel,
  ItemIndicator: SelectItemIndicator,
  ItemText: SelectItemText,
  Label: SelectLabel,
  Positioner: SelectPositioner,
  Trigger: SelectTrigger,
  ValueText: SelectValueText,
}

export const Select = Object.assign(
  SelectRoot,
  Components,
) as typeof SelectRoot & typeof Components
