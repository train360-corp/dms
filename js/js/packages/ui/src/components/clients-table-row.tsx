"use client";

import { TableCell, TableRow } from "@workspace/ui/components/table";
import * as React from "react";
import { columns } from "@workspace/ui/components/clients-table-columns";
import { Tables } from "@workspace/supabase/types";
import { useRouter } from "next/navigation";
import { BuildingIcon, FolderOpenIcon } from "lucide-react";
import { IconDatabaseMinus, IconDatabasePlus, IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { createClient } from "@workspace/web/lib/supabase/client";
import { useRealtimeRow } from "@workspace/web/hooks/use-realtime-row";



export const ClientRow = ({ client }: {
  client: Tables<"clients">;
}) => {

  const router = useRouter();
  const { loading, row: favorite } = useRealtimeRow({
    table: "favorites",
    column: "client_id",
    value: client.id
  });

  return (
    <TableRow className={"cursor-pointer"} onClick={() => router.push(`/dashboard/clients/${client.id}`)}>
      <TableCell>
        <BuildingIcon/>
      </TableCell>
      {columns.map((col, index) => (
        <TableCell key={index} width={col.width}>
          {client[col.key]}
        </TableCell>
      ))}
      <TableCell align={"right"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button onClick={(e) => e.stopPropagation()} variant={"ghost"} size="icon" className="size-8">
              <IconDotsVertical/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>{"Client"}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                disabled={loading}
                onClick={async (e) => {
                  e.stopPropagation(); // don't trigger row click
                  const supabase = createClient();
                  const { data: { user } } = await supabase.auth.getUser();
                  if (favorite === null) await supabase.from("favorites").insert({
                    user_id: user?.id ?? "",
                    client_id: client.id
                  }).select().single();
                  else await supabase.from("favorites").delete().eq("client_id", client.id).eq("user_id", user?.id ?? "");
                }}
              >
                {`${favorite ? "Remove from" : "Add to"} My Clients`}
                <DropdownMenuShortcut>
                  {favorite ? <IconDatabaseMinus/> : <IconDatabasePlus/>}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              {"View"}
              <DropdownMenuShortcut>
                <FolderOpenIcon/>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};