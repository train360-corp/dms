"use client";

import { FolderUpIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Tables } from "@workspace/supabase/types";
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