import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileBrowser } from "@train360-corp/dms/components/file-browser";
import { H1, P } from "@train360-corp/dms/components/ui/text";
import {
  NavigateUpButton
} from "@train360-corp/dms/app/dashboard/clients/[clientID]/[projectID]/[directoryID]/nav-up-button";
import Link from "next/link";
import { NIL } from "uuid";



export default async function Page(props: {
  params: Promise<{
    clientID: string;
    projectID: string;
    directoryID: string;
    symlinkID: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  const supabase = await createClient();
  const searchParams = await props.searchParams;
  const { clientID, projectID, directoryID, symlinkID } = await props.params;

  if (("version" in searchParams) && (typeof searchParams.version !== "string" || Number.isNaN(Number(searchParams.version)))) redirect("/dashboard/clients");

  const client = await supabase.from("clients").select().eq("id", Number(clientID)).single();
  const project = await supabase.from("projects").select().eq("client_id", Number(clientID)).eq("project_number", Number(projectID)).single();
  const directory = await supabase.from("directories").select().eq("project_id", project.data?.id ?? NIL).eq("id", directoryID).single();
  const symlink = await supabase.from("symlinks").select().eq("directory_id", directory.data?.id ?? NIL).eq("id", symlinkID).single();

  const file = await supabase.from("files").select().eq("id", symlink.data?.file_id ?? NIL).single();
  let versionQuery = supabase.from("files_versions").select().eq("file_id", file.data?.id ?? NIL);
  if ("version" in searchParams) {
    versionQuery = versionQuery.eq("version", Number(searchParams.version));
  } else {
    versionQuery = versionQuery.eq("id", file.data?.current_version_id ?? NIL);
  }
  const version = await versionQuery.single();
  const object = await supabase.storage.from(project.data?.id ?? NIL).info(`/${version.data?.object_id ?? NIL}`);

  if (client.error || project.error || directory.error || symlink.error || file.error || version.error || object.error) redirect("/dashboard/clients");

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
            <H1>{symlink.data.name || version.data.name}</H1>
          </div>
        </div>

      </div>
    </div>
  );
}