import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";
import { CSSProperties, ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@train360-corp/dms/components/ui/sidebar";
import { AppSidebar } from "@train360-corp/dms/components/app-sidebar";
import { SiteHeader } from "@train360-corp/dms/components/site-header";



export default async function Layout({ children }: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user?.user) {
    redirect("/auth/login");
  }


  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <AppSidebar variant="inset"/>
      <SidebarInset>
        <SiteHeader/>
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}