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
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { DropIndicator } from "./DropIndicator"

export type PossibleEdge = "top" | "bottom"

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

const DropIndicatorWrapper = styled("div", {
  base: {
    position: "absolute",
    w: "100%",
  },
  variants: {
    edge: {
      top: {
        top: "calc(calc(-1 * var(--service-list-gap)) / 2)",
        transform: "translateY(-50%)",
      },
      bottom: {
        bottom: "calc(calc(-1 * var(--service-list-gap)) / 2)",
        transform: "translateY(50%)",
      },
    },
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
  const [isTargeted, setIsTargeted] = createSignal<PossibleEdge>()
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
      getData({ input, element }) {
        const data = {
          ...props.service,
        }
        return attachClosestEdge(data, {
          input,
          element,
          allowedEdges: ["top", "bottom"],
        })
      },
      onDragEnter(args) {
        const edge = extractClosestEdge(args.self.data)
        if (edge != "top" && edge != "bottom") return
        setIsTargeted(edge)
      },
      onDragLeave(args) {
        setIsTargeted()
      },
      onDrop({ source, self, location }) {
        setIsTargeted()
        if (source.element === self.element) return
        mainProps.onReceiveDrop?.({ source, self, location })
      },
      // canDrop({ element, source }) {
      //   if (element === source.element) return false
      //   return true
      // },
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
          position: "relative",
        }),
        mainProps.class,
      )}
      {...restProps}
    >
      <DropIndicatorWrapper
        edge="top"
        display={isTargeted() === "top" ? "block" : "none"}
      >
        <DropIndicator />
      </DropIndicatorWrapper>

      <Item opacity={isDragged() ? 0.3 : 1}>
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

      <DropIndicatorWrapper
        edge="bottom"
        display={isTargeted() === "bottom" ? "block" : "none"}
      >
        <DropIndicator />
      </DropIndicatorWrapper>
    </div>
  )
}
