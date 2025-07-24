import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@train360-corp/dms/components/ui/table";
import { SettingsIcon } from "lucide-react";
import * as React from "react";
import { columns } from "@train360-corp/dms/components/clients-table-columns";
import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { ClientRow } from "@train360-corp/dms/components/clients-table-row";



export default function ClientsTable({clients, noRowsText}: {
  clients: readonly Tables<"clients">[];
  noRowsText?: string;
}) {
  return (
    <div className="flex flex-col gap-4 overflow-auto overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>
              {/*<BuildingIcon />*/}
            </TableHead>
            {columns.map((col, index) => (
              <TableHead key={index}>
                {col.header}
              </TableHead>
            ))}
            <TableHead>
              <SettingsIcon className={"ml-auto"} size={16}/>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">

          {(clients.length > 0) ? clients.map((client, index) => (
            <ClientRow client={client} key={index}/>
          )) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 2}
                className="h-24 text-center"
              >
                {noRowsText ?? "Looks like you haven't created a client yet! Create one to get started."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}