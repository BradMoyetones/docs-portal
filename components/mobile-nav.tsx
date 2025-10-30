"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { showMcpDocs } from "@/lib/flags"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york-v4/ui/popover"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/new-york-v4/ui/collapsible"
import { SidebarMenuButton, sidebarMenuButtonVariants, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/registry/new-york-v4/ui/sidebar"
import { ChevronRight } from "lucide-react"

const TOP_LEVEL_SECTIONS = [
  { name: "Empezar", href: "/docs" },
  {
    name: "Bibliotecas",
    href: "/docs/libraries",
  },
]

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree
  items: { href: string; label: string }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">
            Menu
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              <MobileLink href="/" onOpenChange={setOpen}>
                Inicio
              </MobileLink>
              {items.map((item, index) => (
                <MobileLink key={index} href={item.href} onOpenChange={setOpen}>
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              Secciones
            </div>
            <div className="flex flex-col gap-3">
              {TOP_LEVEL_SECTIONS.map(({ name, href }) => {
                if (!showMcpDocs && href.includes("/mcp")) {
                  return null
                }
                return (
                  <MobileLink key={name} href={href} onOpenChange={setOpen}>
                    {name}
                  </MobileLink>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {tree?.children?.map((group, index) => {
              if (group.type === "folder") {
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-sm font-medium">
                      {group.name}
                    </div>
                    <div className="flex flex-col gap-3">
                      {group.children.map((item) => {

                        if(item.type === "folder"){
                          return (
                            <Collapsible
                              key={item.$id}
                              asChild
                              defaultOpen={true}
                              className="group/collapsible"
                            >
                              <div className={cn("group/menu-item relative")}>
                                {item.children.length === 0 ? (
                                  item.index?.url ? (
                                    <Link href={item.index.url} className={cn(sidebarMenuButtonVariants({ variant: "default", size: "default" }), "text-2xl font-medium")}>
                                      <span>{item.name}</span>
                                    </Link>
                                  ): (
                                    <button className={cn(sidebarMenuButtonVariants({ variant: "default", size: "default" }), "text-2xl font-medium")}>
                                      <span>{item.name}</span>
                                    </button>
                                  )
                                ): (
                                  <CollapsibleTrigger asChild onClick={() => setOpen(!open)}>
                                    {item.index?.url ? (
                                      <Link href={item.index.url} className={"text-2xl font-medium flex items-center"}>
                                        <span>{item.name}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                      </Link>
                                    ): (
                                      <button className={"text-2xl font-medium flex items-center"}>
                                        <span>{item.name}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                      </button>
                                    )}
                                  </CollapsibleTrigger>
                                )}
                                <CollapsibleContent>
                                  <ul 
                                    className={cn(
                                      "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
                                      "group-data-[collapsible=icon]:hidden"
                                    )}
                                  >
                                    {item.children.map((item) => {
                                      if (
                                        !showMcpDocs &&
                                        item.type === "page" &&
                                        item.url?.includes("/mcp")
                                      )
                                      return null
                                      
                                      return (
                                        item.type === "page" && (
                                          <li className={cn("group/menu-sub-item relative")} key={item.$id} onClick={() => setOpen(!open)}>
                                            <button 
                                              className="px-2 py-1"
                                            >
                                              <Link href={item.url}>
                                                <span>{item.name}</span>
                                              </Link>
                                            </button>
                                          </li>
                                        )
                                      )
                                    })}
                                  </ul>
                                </CollapsibleContent>
                              </div>
                            </Collapsible>
                          )
                        }

                        if (item.type === "page") {
                          if (!showMcpDocs && item.url.includes("/mcp")) {
                            return null
                          }
                          return (
                            <MobileLink
                              key={`${item.url}-${index}`}
                              href={item.url}
                              onOpenChange={setOpen}
                              className="flex items-center gap-2"
                            >
                              {item.name}{" "}
                            </MobileLink>
                          )
                        }
                      })}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
