import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileBrowser } from "@train360-corp/dms/components/file-browser";
import { H1, H2, P } from "@train360-corp/dms/components/ui/text";



export default async function Page({ params, }: {
  params: Promise<{
    clientID: string;
    projectID: string;
    directoryID: string;
  }>
}) {

  const supabase = await createClient();
  const { clientID, projectID, directoryID } = await params;
  const client = await supabase.from("clients").select().eq("id", Number(clientID)).single();
  const project = await supabase.from("projects").select().eq("client_id", Number(clientID)).eq("project_number", Number(projectID)).single();

  let directoryQuery = supabase.from("directories").select().eq("project_id", project.data?.id ?? "");
  if(directoryID !== "_") directoryQuery = directoryQuery.eq("id", directoryID);
  const directory = await directoryQuery.maybeSingle();

  if (client.error || project.error || directory.error) redirect("/dashboard/clients");

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">

        <div className={"flex flex-col gap-2"}>
          <div className={"flex flex-row items-center gap-2"}>
            <P>{client.data.name}</P>
            <P>{"·"}</P>
            <P>{project.data.name}</P>
          </div>
          <H1>{directory.data ? directory.data.name : "Files"}</H1>
        </div>

        <FileBrowser directoryID={directoryID} project={project.data} client={client.data}/>
      </div>
    </div>
  );
}