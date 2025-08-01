"use client";

import { TableCell, TableRow } from "@workspace/ui/components/table";
import * as React from "react";
import { columns } from "@workspace/web/app/dashboard/clients/[clientID]/columns";
import { Tables } from "@workspace/web/types/supabase/types.gen";
import { useRouter } from "next/navigation";



export const ProjectRow = ({ project }: {
  project: Tables<"projects">;
}) => {

  const router = useRouter();

  return (
    <TableRow className={"cursor-pointer"}
              onClick={() => router.push(`/dashboard/clients/${project.client_id}/${project.project_number}`)}>
      {columns.map((col, index) => (
        <TableCell key={index}>
          {project[col.key]}
        </TableCell>
      ))}
    </TableRow>
  );
};