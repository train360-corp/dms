import * as React from "react";
import { IconInnerShadowTop, } from "@tabler/icons-react";

import { NavSection } from "@train360-corp/dms/components/nav-section";
import { NavQuickCreate } from "@train360-corp/dms/components/nav-quick-create";
import { NavUser } from "@train360-corp/dms/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@train360-corp/dms/components/ui/sidebar";
import { sections } from "@train360-corp/dms/components/nav-items";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5"/>
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavQuickCreate/>
        {sections.map((section, index) => (
          <NavSection sectionNumber={index} section={section} key={index}/>
        ))}
        {/*<NavSecondary items={data.navSecondary} className="mt-auto"/>*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  );
}
