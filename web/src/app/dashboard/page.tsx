import { AppSidebar } from "@train360-corp/dms/components/app-sidebar"
import { ChartAreaInteractive } from "@train360-corp/dms/components/chart-area-interactive"
import { DataTable } from "@train360-corp/dms/components/data-table"
import { SectionCards } from "@train360-corp/dms/components/section-cards"
import { SiteHeader } from "@train360-corp/dms/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@train360-corp/dms/components/ui/sidebar"
import { redirect } from 'next/navigation'
import { createClient } from '@train360-corp/dms/lib/supabase/server'

import data from "./data.json"
import { CSSProperties } from "react";

export default async function Page() {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
