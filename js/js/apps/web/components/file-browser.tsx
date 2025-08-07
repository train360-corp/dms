import { Tables } from "@workspace/supabase/types";
import { createClient } from "@workspace/web/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileBrowserDropzoneWrapper } from "@workspace/web/components/file-browser-dropzone-wrapper";
import FileBrowserTable from "@workspace/web/components/file-browser-table";



export const FileBrowser = async ({ client, project, directoryID }: {
  client: Tables<"clients">;
  project: Tables<"projects">;
  directoryID: string;
}) => {

  const supabase = await createClient();
  const isRootPath = directoryID === "_";

  const directory = isRootPath ? null : await supabase.from("directories").select().eq("project_id", project.id).eq("id", directoryID).single();

  if (directory?.error) redirect(`/dashboard/clients/${client.id}/${project.id}`);

  return (
    <div className="flex flex-col rounded-lg border h-full max-h-full overflow-scroll">
      <FileBrowserDropzoneWrapper
        project={project}
        directory={directory?.data ?? null}
      >
        <FileBrowserTable
          project={project}
          directory={directory?.data ?? null}
        />
      </FileBrowserDropzoneWrapper>
    </div>
  );
};