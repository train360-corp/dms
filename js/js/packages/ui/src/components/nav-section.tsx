import { type Icon, } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { NavSectionButton } from "@workspace/ui/components/nav-section-button";



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

export function NavSection({ section, sectionNumber }: {
  section: NavSection;
  sectionNumber: number;
}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {section.title !== undefined && (
        <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
      )}
      <SidebarMenu>
        {section.items.map((item, index) => (
          <SidebarMenuItem key={item.name}>

            <NavSectionButton sectionNumber={sectionNumber} itemNumber={index}/>

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
