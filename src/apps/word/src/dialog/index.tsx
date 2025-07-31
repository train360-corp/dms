import React from "react";
import { createRoot } from "react-dom/client";
import "@addin/styles/globals.css";
import { SidebarInset, SidebarProvider } from "@addin/components/ui/sidebar";
import { SiteHeader } from "@addin/components/site-header";
import { AppSidebar } from "@addin/components/app-sidebar";



Office.onReady(() => {
  const root = createRoot(document.getElementById("root")!);

  // match theme to system
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(systemTheme);

  root.render(<Dialog/>);
});

function Sidebar({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader/>
        <div className="flex flex-1">
          <AppSidebar/>
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

function Dialog() {

  return (
    <div className="dark:bg-background flex flex-1 flex-col gap-2 w-full h-full">
      <Sidebar>
        <div className="flex flex-col gap-4 md:gap-6">
          <p>{""}</p>
        </div>
      </Sidebar>
    </div>
  );
}