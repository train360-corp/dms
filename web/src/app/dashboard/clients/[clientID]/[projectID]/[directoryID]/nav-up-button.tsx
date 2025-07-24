"use client";

import { FolderUpIcon } from "lucide-react";
import { Button } from "@train360-corp/dms/components/ui/button";
import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { useRouter } from "next/navigation";



export const NavigateUpButton = ({ directory, project, client }: {
  directory: Tables<"directories"> | null;
  project: Tables<"projects">;
  client: Tables<"clients">;
}) => {

  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/dashboard/clients/${client.id}/${project.project_number}/${directory === null || directory.parent_id === null ? "_" : directory.parent_id}`)}
      variant={"outline"} size={"icon"} className={"size-8"}>
      <FolderUpIcon/>
    </Button>
  );
};