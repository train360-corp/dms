import { Calendar } from "@addin/components/ui/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@addin/components/ui/sidebar"
import * as React from "react";

export function DatePicker() {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]" />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
