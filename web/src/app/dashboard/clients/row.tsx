"use client";

import { TableCell, TableRow } from "@train360-corp/dms/components/ui/table";
import * as React from "react";
import { columns } from "@train360-corp/dms/app/dashboard/clients/columns";
import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { useRouter } from "next/navigation";



export const ClientRow = ({ client }: {
  client: Tables<"clients">;
}) => {

  const router = useRouter();

  return (
    <TableRow className={"cursor-pointer"} onClick={() => router.push(`/dashboard/clients/${client.id}`)}>
      {columns.map((col, index) => (
        <TableCell key={index}>
          {client[col.key]}
        </TableCell>
      ))}
    </TableRow>
  );
};