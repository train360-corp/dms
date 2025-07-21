"use client";

import { type Icon, } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@train360-corp/dms/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@train360-corp/dms/components/ui/badge";



type NavSectionItem = {
  name: string;
  url: string;
  icon: Icon;
  isComingSoon?: true;
}

export type NavSection = {
  title: string | undefined;
  items: readonly NavSectionItem[];
}

export function NavSection({ section, }: {
  section: NavSection
}) {
  const router = useRouter();
  const path = usePathname();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {section.title !== undefined && (
        <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
      )}
      <SidebarMenu>
        {section.items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton disabled={item.url === path || item.isComingSoon} isActive={item.url === path} onClick={() => router.push(item.url)}>
              <item.icon/>
              <span>{item.name}</span>
              { item.isComingSoon && (
                <Badge
                  variant="outline"
                >
                  {"Coming Soon"}
                </Badge>
              ) }
            </SidebarMenuButton>
            {/*<DropdownMenu>*/}
            {/*  <DropdownMenuTrigger asChild>*/}
            {/*    <SidebarMenuAction*/}
            {/*      showOnHover*/}
            {/*      className="data-[state=open]:bg-accent rounded-sm"*/}
            {/*    >*/}
            {/*      <IconDots/>*/}
            {/*      <span className="sr-only">More</span>*/}
            {/*    </SidebarMenuAction>*/}
            {/*  </DropdownMenuTrigger>*/}
            {/*  <DropdownMenuContent*/}
            {/*    className="w-24 rounded-lg"*/}
            {/*    side={isMobile ? "bottom" : "right"}*/}
            {/*    align={isMobile ? "end" : "start"}*/}
            {/*  >*/}
            {/*    <DropdownMenuItem>*/}
            {/*      <IconFolder/>*/}
            {/*      <span>Open</span>*/}
            {/*    </DropdownMenuItem>*/}
            {/*    <DropdownMenuItem>*/}
            {/*      <IconShare3/>*/}
            {/*      <span>Share</span>*/}
            {/*    </DropdownMenuItem>*/}
            {/*    <DropdownMenuSeparator/>*/}
            {/*    <DropdownMenuItem variant="destructive">*/}
            {/*      <IconTrash/>*/}
            {/*      <span>Delete</span>*/}
            {/*    </DropdownMenuItem>*/}
            {/*  </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
