import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@train360-corp/dms/components/ui/table";
import * as React from "react";
import { H1 } from "@train360-corp/dms/components/ui/text";
import { columns } from "@train360-corp/dms/app/dashboard/clients/columns";
import { ClientRow } from "@train360-corp/dms/app/dashboard/clients/row";



export default async function Page() {

  const supabase = await createClient();

  const { data } = await supabase.from("clients").select();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">

        <H1>{"Clients"}</H1>

        <div className="flex flex-col gap-4 overflow-auto overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead key={index}>
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">

              {(data !== null && data.length > 0) ? data.map((client, index) => (
                <ClientRow client={client} key={index}/>
              )) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {"Looks like you haven't created a client yet! Create one to get started."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>


      </div>
    </div>
  );
}