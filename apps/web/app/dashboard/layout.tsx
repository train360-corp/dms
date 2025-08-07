import { createClient } from "@workspace/web/lib/supabase/server";
import { redirect } from "next/navigation";
import { CSSProperties, ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar";
import { AppSidebar } from "@workspace/web/components/app-sidebar";
import { SiteHeader } from "@workspace/ui/components/site-header";



export default async function Layout({ children }: { children: ReactNode }) {
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
      <SidebarInset className="m-0 rounded-xl shadow-sm h-full overflow-hidden">
        <div className="flex h-full flex-col">
          <SiteHeader/>
          <div className="flex flex-1 flex-col overflow-hidden min-h-0">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}