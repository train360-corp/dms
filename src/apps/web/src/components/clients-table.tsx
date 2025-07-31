"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@train360-corp/dms/components/ui/table";
import * as React from "react";
import { columns } from "@train360-corp/dms/components/clients-table-columns";
import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { ClientRow } from "@train360-corp/dms/components/clients-table-row";
import { useDebounce } from "@uidotdev/usehooks";
import { Skeleton } from "@train360-corp/dms/components/ui/skeleton";
import { BuildingIcon } from "lucide-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@train360-corp/dms/components/ui/button";



export default function ClientsTable({ clients, noRowsText, loading }: {
  clients: readonly Tables<"clients">[];
  noRowsText?: string;
  loading?: boolean;
}) {

  const isLoading = useDebounce(loading ?? false, 500);

  return (
    <div className="flex flex-col gap-4 overflow-auto overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>
              {/* Icon */}
            </TableHead>
            {columns.map((col, index) => (
              <TableHead key={index}>
                {col.header}
              </TableHead>
            ))}
            <TableHead>
              {/* Settings */}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {isLoading ? (
            <TableRow>
              <TableCell>
                <BuildingIcon className={"text-muted"}/>
              </TableCell>
              {columns.map((col, index) => (
                <TableCell key={index} width={col.width}>
                  <Skeleton className="h-4 w-[50px]"/>
                </TableCell>
              ))}
              <TableCell align={"right"}>
                <Button disabled variant={"ghost"} size="icon" className="size-8">
                  <IconDotsVertical/>
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            (clients.length > 0) ? clients.map((client, index) => (
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
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}