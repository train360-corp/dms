import { createClient } from "@train360-corp/dms/lib/supabase/server";
import * as React from "react";
import { H1 } from "@train360-corp/dms/components/ui/text";
import ClientsTable from "@train360-corp/dms/components/clients-table";



export default async function Page() {

  const supabase = await createClient();

  const { data } = await supabase.from("clients").select();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">

        <H1>{"Clients"}</H1>

        <ClientsTable clients={data ?? []}/>

      </div>
    </div>
  );
}