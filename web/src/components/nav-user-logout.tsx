"use client";
import { useRouter } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
import { DropdownMenuItem } from "@train360-corp/dms/components/ui/dropdown-menu";
import { createClient } from "@train360-corp/dms/lib/supabase/client";



export const NavUserLogout = () => {

  const router = useRouter();
  const supabase = createClient();

  return (
    <DropdownMenuItem onClick={async () => {
      await supabase.auth.signOut();
      router.replace("/auth/login");
    }}>
      <IconLogout/>
      Log out
    </DropdownMenuItem>
  )

}