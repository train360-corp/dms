import { createClient } from "@workspace/web/lib/supabase/server";
import { redirect } from "next/navigation";
import { H1, H2, P } from "@workspace/ui/components/text";
import * as React from "react";
import { FileBrowser } from "@workspace/web/components/file-browser";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import Link from "next/link";
import { PageContent } from "@workspace/web/components/page-content";



export default async function Page({ params }: {
  params: Promise<{
    clientID: string;
    projectID: string;
  }>
}) {

  const { clientID, projectID } = await params;
  const supabase = await createClient();
  const client = await supabase.from("clients").select().eq("id", Number(clientID)).single();
  const project = await supabase.from("projects").select().eq("client_id", client.data?.id ?? 0).eq("project_number", Number(projectID)).single();
  const permissions = await supabase.from("permissions").select("*, user_id (*)").eq("project_id", project.data?.id ?? "");

  if (client.error || project.error || permissions.error) redirect("/dashboard/clients");

  return (
    <PageContent>
      <div className={"flex flex-col"}>
        <Link href={`/dashboard/clients/${client.data.id}`}>
          <P className="cursor-pointer hover:underline">{client.data.name}</P>
        </Link>
        <H1>{project.data.name}</H1>
      </div>

      <div className={"flex flex-col gap-2 md:gap-4"}>
        <H2>{"People"}</H2>
        <div className="flex flex-col gap-4 overflow-auto overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>{"Name"}</TableHead>
                <TableHead className={"text-right"}>{"Access"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">

              <TableRow>
                <TableCell>{"Default"}</TableCell>
                <TableCell align={"right"}>{project.data.access}</TableCell>
              </TableRow>

              {permissions.data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.user_id.full_name}</TableCell>
                  <TableCell align={"right"}>{row.level}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </div>
      </div>

      <div className={"flex flex-col gap-2 md:gap-4"}>
        <H2>{"Files"}</H2>

        <FileBrowser
          client={client.data}
          project={project.data}
          directoryID={"_"}
        />

      </div>
    </PageContent>
  );

}