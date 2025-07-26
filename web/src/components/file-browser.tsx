import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@train360-corp/dms/components/ui/table";
import { redirect } from "next/navigation";
import { columns } from "@train360-corp/dms/components/file-browser-directory-columns";
import FileBrowserDirectoryRow from "@train360-corp/dms/components/file-browser-directory-row";
import { FileBrowserInsert } from "@train360-corp/dms/components/file-browser-insert";



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
    <div className="flex flex-col gap-4 overflow-y-auto rounded-lg border h-full">
      <FileBrowserInsert bucket={project.id}>
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead/>
              {columns.map((col, index) => (
                <TableHead key={index} className={`last:text-right`}>
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
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  {"Looks like you haven't created anything yet! Create something to get started."}
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </FileBrowserInsert>
    </div>
  );
};