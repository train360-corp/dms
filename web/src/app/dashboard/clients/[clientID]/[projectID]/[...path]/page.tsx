import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileBrowser } from "@train360-corp/dms/components/file-browser";
import { H1 } from "@train360-corp/dms/components/ui/text";



export default async function Page({ params, }: {
  params: Promise<{
    clientID: string;
    projectID: string;
    path: string[];
  }>
}) {

  const supabase = await createClient();
  const { clientID, projectID, path } = await params;
  const client = await supabase.from("clients").select().eq("id", Number(clientID)).single();
  const project = await supabase.from("projects").select().eq("client_id", Number(clientID)).eq("project_number", Number(projectID)).single();

  if (client.error || project.error) redirect("/dashboard/clients");

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">

        <H1>{"Files"}</H1>

        <FileBrowser path={path} project={project.data} client={client.data}/>
      </div>
    </div>
  );
}