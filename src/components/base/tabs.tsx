import { Tabs as __Tabs } from "@ark-ui/solid"
import type { ComponentProps } from "solid-js"
import { styled } from "styled-system/jsx"
import { tabs } from "styled-system/recipes"
import { createStyleContext } from "~/lib/create-style-context"

const { withProvider, withContext } = createStyleContext(tabs)

export const TabsRoot = withProvider(styled(__Tabs.Root), "root")
export const TabsContent = withContext(styled(__Tabs.Content), "content")
export const TabsIndicator = withContext(styled(__Tabs.Indicator), "indicator")
export const TabsList = withContext(styled(__Tabs.List), "list")
export const TabsTrigger = withContext(styled(__Tabs.Trigger), "trigger")

export interface TabsContentProps extends ComponentProps<typeof TabsContent> {}
export interface TabsIndicatorProps
  extends ComponentProps<typeof TabsIndicator> {}
export interface TabsListProps extends ComponentProps<typeof TabsList> {}
export interface TabsTriggerProps extends ComponentProps<typeof TabsTrigger> {}
export interface TabsRootProps extends ComponentProps<typeof TabsRoot> {}

const Components = {
  Content: TabsContent,
  Indicator: TabsIndicator,
  List: TabsList,
  Trigger: TabsTrigger,
}
export const Tabs = Object.assign(TabsRoot, Components) as typeof TabsRoot &
  typeof Components
