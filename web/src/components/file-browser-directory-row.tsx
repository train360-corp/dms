"use client";


import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@train360-corp/dms/components/ui/table";
import * as React from "react";
import { columns } from "@train360-corp/dms/components/file-browser-directory-columns";
import { IconFold, IconFolder, IconFolderStar } from "@tabler/icons-react";



export default function FileBrowserDirectoryRow({ directory, project }: {
  directory: Tables<"directories">;
  project: Tables<"projects">;
}) {
  const router = useRouter();

  return (
    <TableRow className={"cursor-pointer"}
              onClick={() => router.push(`/dashboard/clients/${project.client_id}/${project.project_number}/${directory.id}`)}>
      <TableCell>
        <IconFolder />
      </TableCell>
      {columns.map((col, index) => (
        <TableCell key={index} className={"last:text-right"}>
          {col.formatter ? col.formatter(directory[col.key]) : directory[col.key]}
        </TableCell>
      ))}
    </TableRow>
  );
}