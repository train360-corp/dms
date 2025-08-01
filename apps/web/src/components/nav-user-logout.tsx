"use client";
import { useRouter } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
import { DropdownMenuItem } from "@workspace/ui/components/dropdown-menu";
import { createClient } from "@workspace/web/lib/supabase/client";



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
  );

};