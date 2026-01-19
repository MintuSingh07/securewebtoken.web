"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

/* ---------------------------------- */
/* Theme Config */
/* ---------------------------------- */

const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

/* ---------------------------------- */
/* Context */
/* ---------------------------------- */

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within <ChartContainer />")
  }
  return context
}

/* ---------------------------------- */
/* Chart Container */
/* ---------------------------------- */

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

/* ---------------------------------- */
/* Chart Style */
/* ---------------------------------- */

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, v]) => v.color || v.theme
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
                .map(([key, cfg]) => {
                  const color =
                    cfg.theme?.[theme as keyof typeof cfg.theme] || cfg.color
                  return color ? `--color-${key}: ${color};` : ""
                })
                .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

/* ---------------------------------- */
/* Tooltip */
/* ---------------------------------- */

const ChartTooltip = RechartsPrimitive.Tooltip

interface ChartTooltipContentProps extends React.ComponentPropsWithoutRef<"div"> {
  active?: boolean
  payload?: any[]
  label?: any
}

function ChartTooltipContent({
  active,
  payload,
  className,
  label,
}: ChartTooltipContentProps) {

  const { config } = useChart()

  if (!active || !payload?.length) return null

  const item = payload[0]
  const key = `${item.dataKey || item.name || "value"}`
  const itemConfig = getPayloadConfigFromPayload(config, item, key)

  return (
    <div
      className={cn(
        "rounded-lg border bg-background px-3 py-2 text-xs shadow",
        className
      )}
    >
      <div className="font-medium">
        {itemConfig?.label || label}
      </div>
      <div className="tabular-nums">
        {item.value?.toLocaleString()}
      </div>
    </div>
  )
}

/* ---------------------------------- */
/* Legend */
/* ---------------------------------- */

const ChartLegend = RechartsPrimitive.Legend

interface ChartLegendContentProps extends React.ComponentPropsWithoutRef<"div"> {
  payload?: any[]
}

function ChartLegendContent({
  payload,
  className,
}: ChartLegendContentProps) {

  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div className={cn("flex justify-center gap-4", className)}>
      {payload.map((item) => {
        const key = `${item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div key={item.value} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span>{itemConfig?.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ---------------------------------- */
/* Helper */
/* ---------------------------------- */

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  if (!payload) return undefined

  const name =
    payload.name ||
    payload.dataKey ||
    payload.payload?.[key]

  return config[name] || config[key]
}

/* ---------------------------------- */
/* Exports */
/* ---------------------------------- */

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
