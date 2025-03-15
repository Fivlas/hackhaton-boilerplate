"use client"

import * as React from "react"
import { Command } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/hooks/useSession"
import Link from "next/link"
import { SidebarData } from "@/constants/dashboard/sidebar"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const session = useSession()!;

  // const navUser = {
    // name: session.name,
    // email: session.email,
    // avatar: session.image as string,
  // }


  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarData.navMain} />
        <NavProjects projects={SidebarData.projects} />
        <NavSecondary items={SidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={SidebarData.user} />
        {/* <NavUser user={navUser} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
