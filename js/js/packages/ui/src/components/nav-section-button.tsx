"use client";

import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@workspace/ui/components/badge";
import { SidebarMenuButton } from "@workspace/ui/components/sidebar";
import { sections } from "@workspace/ui/components/nav-items";



export function NavSectionButton({ sectionNumber, itemNumber }: {
  sectionNumber: number;
  itemNumber: number;
}) {

  const item = sections[sectionNumber]!.items[itemNumber]!;
  const router = useRouter();
  const path = usePathname();

  return (
    <SidebarMenuButton disabled={item.url === path || item.isComingSoon} isActive={item.url === path}
                       onClick={() => router.push(item.url)}>
      <item.icon/>
      <span>{item.name}</span>
      {item.isComingSoon && (
        <Badge
          variant="outline"
        >
          {"Coming Soon"}
        </Badge>
      )}
    </SidebarMenuButton>
  );
}