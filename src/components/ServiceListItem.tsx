import { Menu, Grip } from "lucide-solid"
import { css, cx } from "styled-system/css"
import { styled, type StyledComponent } from "styled-system/jsx"
import { bleed } from "styled-system/patterns"
import { token } from "styled-system/tokens"
import type { Service } from "~/core/document"
import type { AvailableServices } from "~/core/service-registry"
import { IconButton } from "./base/icon-button"
import { availableServices } from "./service"
import { ServiceLogo } from "./ServiceLogo"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import {
  createEffect,
  createSignal,
  splitProps,
  type ComponentProps,
} from "solid-js"
import type {
  BaseEventPayload,
  ElementDragType,
  DropTargetLocalizedData,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types"

const Item = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "max-content auto max-content max-content",
    bg: "bg.subtle",
    border: "1px solid transparent",
    alignItems: "center",
    gap: "3",
    px: "3",
    h: "var(--service-list-item-height)",
    borderRadius: "sm",
    _light: {
      borderColor: "border.subtle",
    },
    "& > *": {
      my: "3",
    },
  },
})

const DropArea = styled("div", {
  base: {
    w: "100%",
    h: "var(--service-list-item-height)",
    mb: "var(--service-list-gap)",
    border: "2px dashed",
    borderColor: "border.subtle",
    borderRadius: "sm",
  },
})

export interface ServiceListItemProps extends ComponentProps<"div"> {
  service: Service
  onReceiveDrop?: (
    args: BaseEventPayload<ElementDragType> & DropTargetLocalizedData,
  ) => void
}
export function ServiceListItem(props: ServiceListItemProps) {
  const [isDragged, setIsDragged] = createSignal(false)
  const [isTargeted, setIsTargeted] = createSignal(false)
  const [mainProps, restProps] = splitProps(props, [
    "service",
    "onReceiveDrop",
    "class",
  ])

  let ref!: HTMLDivElement

  createEffect(() => {
    if (ref == null) return

    const cleanupDraggable = draggable({
      element: ref,
      onDragStart(args) {
        setIsDragged(true)
      },
      onDrop(args) {
        setIsDragged(false)
      },
    })
    const cleanupDropTarget = dropTargetForElements({
      element: ref,
      onDragEnter(args) {
        setIsTargeted(true)
      },
      onDragLeave(args) {
        setIsTargeted(false)
      },
      onDrop({ source, self, location }) {
        setIsTargeted(false)
        if (source.element === self.element) return
        mainProps.onReceiveDrop?.({ source, self, location })
      },
      canDrop({ element, source }) {
        if (element === source.element) return false
        return true
      },
    })

    return () => {
      cleanupDraggable()
      cleanupDropTarget()
    }
  })

  return (
    <div
      ref={ref}
      class={cx(
        css({
          display: isDragged() ? "none" : "initial",
          paddingBlockStart: "var(--service-list-gap)",
        }),
        mainProps.class,
      )}
      {...restProps}
    >
      <DropArea display={isTargeted() ? "block" : "none"} />

      <Item>
        <IconButton size="xs" variant="outline">
          <Menu />
        </IconButton>
        <div>
          <div class={css({ textStyle: "md", fontWeight: "600" })}>
            {props.service.name ??
              availableServices[props.service.serviceName as AvailableServices]
                .title}
          </div>
          <div class={css({ textStyle: "xs", color: "fg.subtle" })}>
            {
              availableServices[props.service.serviceName as AvailableServices]
                .title
            }
          </div>
        </div>
        <ServiceLogo
          service={props.service.serviceName as AvailableServices}
          h="8"
        />
        <div
          class={bleed({
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            inline: "3",
            marginInlineStart: "0",
            bg: "bg.muted",
            p: "1",
          })}
        >
          <Grip color={token("colors.fg.subtle")} size={12} />
        </div>
      </Item>
    </div>
  )
}
