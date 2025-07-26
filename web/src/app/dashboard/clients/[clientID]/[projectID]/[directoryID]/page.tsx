import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileBrowser } from "@train360-corp/dms/components/file-browser";
import { H1, P } from "@train360-corp/dms/components/ui/text";
import {
  NavigateUpButton
} from "@train360-corp/dms/app/dashboard/clients/[clientID]/[projectID]/[directoryID]/nav-up-button";
import Link from "next/link";



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

  let directoryQuery = supabase.from("directories").select().eq("project_id", project.data?.id ?? "").eq("id", directoryID).maybeSingle();
  const directory = directoryID === "_" ? null : await directoryQuery;

  if (client.error || project.error || directory?.error) redirect("/dashboard/clients");

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 h-full">

        <div className={"flex flex-col gap-2"}>
          <div className={"flex flex-row items-center gap-2"}>
            <Link href={`/dashboard/clients/${client.data.id}`}>
              <P className="cursor-pointer hover:underline">{client.data.name}</P>
            </Link>
            <P>{"·"}</P>
            <Link href={`/dashboard/clients/${client.data.id}/${project.data.project_number}`}>
              <P className="cursor-pointer hover:underline">{project.data.name}</P>
            </Link>
          </div>

          <div className={"flex flex-row items-center gap-2"}>
            {directoryID !== "_" && (
              <NavigateUpButton client={client.data} project={project.data} directory={directory?.data ?? null}/>
            )}
            <H1>{directory?.data ? directory.data.name : "Files"}</H1>
          </div>
        </div>

        <FileBrowser directoryID={directoryID} project={project.data} client={client.data}/>
      </div>
    </div>
  );
}