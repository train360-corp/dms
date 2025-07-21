import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";



export default async function Layout({ children }: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user?.user) {
    redirect("/auth/login");
  }

  return children;
}