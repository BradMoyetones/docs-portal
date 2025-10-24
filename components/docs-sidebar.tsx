"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { PAGES_NEW } from "@/lib/docs"
import { showMcpDocs } from "@/lib/flags"
import type { source } from "@/lib/source"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/registry/new-york-v4/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/new-york-v4/ui/collapsible"
import { ChevronRight } from "lucide-react"

// Valores por defecto (pueden venir como props)
const DEFAULT_TOP_LEVEL_SECTIONS = [
  { name: "Empezar", href: "/docs" },
  { name: "Bibliotecas", href: "/docs/libraries" },
]

const DEFAULT_EXCLUDED_SECTIONS = ["installation", "dark-mode"]
const DEFAULT_EXCLUDED_PAGES = ["/docs", "/docs/libraries"]

type DocsSidebarProps = React.ComponentProps<typeof Sidebar> & {
  tree: typeof source.pageTree
  TOP_LEVEL_SECTIONS?: { name: string; href: string }[]
  EXCLUDED_SECTIONS?: string[]
  EXCLUDED_PAGES?: string[]
}

export function DocsSidebar({
  tree,
  TOP_LEVEL_SECTIONS = DEFAULT_TOP_LEVEL_SECTIONS,
  EXCLUDED_SECTIONS = DEFAULT_EXCLUDED_SECTIONS,
  EXCLUDED_PAGES = DEFAULT_EXCLUDED_PAGES,
  ...props
}: DocsSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--footer-height)+2rem)] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2 pb-12">
        <div className="h-(--top-spacing) shrink-0" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Secciones
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOP_LEVEL_SECTIONS.map(({ name, href }) => {
                if (!showMcpDocs && href.includes("/mcp")) return null

                return (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === href}
                      className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                    >
                      <Link href={href}>
                        <span className="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                        {name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {tree.children.map((item) => {
          if (EXCLUDED_SECTIONS.includes(item.$id ?? "")) return null

          return (
            <SidebarGroup key={item.$id}>
              <SidebarGroupLabel className="text-muted-foreground font-medium">
                {item.name}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {item.type === "folder" && (
                  <SidebarMenu className="gap-0.5">
                    {item.children.map((item) => {

                      if(item.type === "folder"){
                        return (
                          <Collapsible
                            key={item.$id}
                            asChild
                            defaultOpen={true}
                            className="group/collapsible"
                          >
                            <SidebarMenuItem>
                              {item.children.length === 0 ? (
                                <SidebarMenuButton asChild>
                                  {item.index?.url ? (
                                    <Link href={item.index.url}>
                                      <span>{item.name}</span>
                                    </Link>
                                  ): (
                                    <div>
                                      <span>{item.name}</span>
                                    </div>
                                  )}
                                </SidebarMenuButton>
                              ): (
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuButton asChild>
                                    {item.index?.url ? (
                                      <Link href={item.index.url}>
                                        <span>{item.name}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                      </Link>
                                    ): (
                                      <div>
                                        <span>{item.name}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                      </div>
                                    )}
                                  </SidebarMenuButton>
                                </CollapsibleTrigger>
                              )}
                              <CollapsibleContent>
                                <SidebarMenuSub>
                                  {item.children.map((item) => {
                                    if (
                                      !showMcpDocs &&
                                      item.type === "page" &&
                                      item.url?.includes("/mcp")
                                    )
                                    return null
                                    
                                    return (
                                      item.type === "page" &&
                                      !EXCLUDED_PAGES.includes(item.url) && (
                                        <SidebarMenuSubItem key={item.$id}>
                                          <SidebarMenuSubButton asChild>
                                            <Link href={item.url}>
                                              <span>{item.name}</span>
                                            </Link>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      )
                                    )
                                  })}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </SidebarMenuItem>
                          </Collapsible>
                        )
                      }
                      
                      if (
                        !showMcpDocs &&
                        item.type === "page" &&
                        item.url?.includes("/mcp")
                      )
                        return null

                      return (
                        item.type === "page" &&
                        !EXCLUDED_PAGES.includes(item.url) && (
                          <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                              asChild
                              isActive={item.url === pathname}
                              className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                            >
                              <Link href={item.url}>
                                <span className="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                                {item.name}
                                {PAGES_NEW.includes(item.url) && (
                                  <span
                                    className="flex size-2 rounded-full bg-blue-500"
                                    title="New"
                                  />
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                      )
                    })}
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
    </Sidebar>
  )
}
