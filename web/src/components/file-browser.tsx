import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@train360-corp/dms/components/ui/table";
import { redirect } from "next/navigation";
import { columns } from "@train360-corp/dms/components/file-browser-directory-columns";
import FileBrowserDirectoryRow from "@train360-corp/dms/components/file-browser-directory-row";



export const FileBrowser = async ({ client, project, directoryID }: {
  client: Tables<"clients">;
  project: Tables<"projects">;
  directoryID: string;
}) => {

  const supabase = await createClient();
  const isRootPath = directoryID === "_";

  const directory = isRootPath ? null : await supabase.from("directories").select().eq("project_id", project.id).eq("id", directoryID).single();

  let directoriesQuery = supabase.from("directories").select().eq("project_id", project.id);
  if (isRootPath) directoriesQuery = directoriesQuery.is("parent_id", null);
  else directoriesQuery = directoriesQuery.eq("parent_id", directory?.data?.id ?? "");
  const directories = await directoriesQuery;

  const items = (directories.data?.length ?? 0);

  if (directory?.error || directories.error) redirect(`/dashboard/clients/${client.id}/${project.id}`);

  return (
    <div className="flex flex-col gap-4 overflow-auto overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">

          {(directories.data.length > 0) && directories.data.map((directory, index) => (
            <FileBrowserDirectoryRow directory={directory} project={project} key={index}/>
          ))}

          {items === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                {"Looks like you haven't created anything yet! Create something to get started."}
              </TableCell>
            </TableRow>
          )}

        </TableBody>
      </Table>
    </div>
  );
};