"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip"

export function copyToClipboardWithMeta(value: string, event?: any) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  event,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
  src?: string
  event?: any
}) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          size="icon"
          variant={variant}
          className={cn(
            "bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100",
            className
          )}
          onClick={() => {
            copyToClipboardWithMeta(
              value
            )
            setHasCopied(true)
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipContent>
    </Tooltip>
  )
}
