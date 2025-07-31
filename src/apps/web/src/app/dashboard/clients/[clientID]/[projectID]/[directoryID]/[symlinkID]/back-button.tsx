"use client";


import { Button } from "@train360-corp/dms/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@train360-corp/dms/types/supabase/types.gen";



export const BackButton = (props: {
  client: Tables<"clients">;
  project: Tables<"projects">;
  directory: Tables<"directories">;
}) => {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={() => router.push(`/dashboard/clients/${props.client.id}/${props.project.project_number}/${props.directory.id}`)}
    >
      <ChevronLeftIcon size={8}/>
    </Button>
  );
};