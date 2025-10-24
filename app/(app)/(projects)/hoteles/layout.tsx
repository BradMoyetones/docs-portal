import { hotelesSource } from "@/lib/source"
import { DocsSidebar } from "@/components/docs-sidebar"
import { SidebarProvider } from "@/registry/new-york-v4/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background relative z-10 flex min-h-svh flex-col theme-container">
      <SiteHeader tree={hotelesSource.pageTree} api="/api/search/hoteles" />
      <main className="flex flex-1 flex-col">
        <div className="container-wrapper flex flex-1 flex-col px-2">
          <SidebarProvider className="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
            <DocsSidebar 
              tree={hotelesSource.pageTree} 
              TOP_LEVEL_SECTIONS={[
                { name: "Empezar", href: "/hoteles/docs" },
                { name: "API", href: "/hoteles/docs/api" },
                { name: "Front End", href: "/hoteles/docs/front-end" },
                { name: "Roles", href: "/hoteles/docs/roles" },
              ]}
              EXCLUDED_PAGES={[
                "/hoteles/docs",
              ]} 
            />
            <div className="h-full w-full">{children}</div>
          </SidebarProvider>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}