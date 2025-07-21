import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";



export default async function Page({ params, }: {
  params: Promise<{
    clientID: string;
    projectID: string;
    path: string[];
  }>
}) {

  const supabase = await createClient();
  const {clientID, projectID, path} = await params;
  const client = await supabase.from("clients").select().eq("id", Number(clientID)).single();
  const project = await supabase.from("projects").select().eq("client_id", Number(clientID)).eq("project_number", Number(projectID)).single();

  if(client.error || project.error) redirect("/dashboard/clients");

  return (
    <></>
  )
}