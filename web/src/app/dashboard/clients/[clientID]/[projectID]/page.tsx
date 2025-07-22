import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";
import { H1, H2, P } from "@train360-corp/dms/components/ui/text";
import * as React from "react";
import { FileBrowser } from "@train360-corp/dms/components/file-browser";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@train360-corp/dms/components/ui/table";
import Link from "next/link";



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
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">

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

          {/*<div className="flex flex-col gap-4 overflow-auto overflow-hidden rounded-lg border">*/}
          {/*  <Table>*/}
          {/*    <TableHeader className="bg-muted sticky top-0 z-10">*/}
          {/*      <TableRow>*/}
          {/*        {columns.map((col, index) => (*/}
          {/*          <TableHead key={index}>*/}
          {/*            {col.header}*/}
          {/*          </TableHead>*/}
          {/*        ))}*/}
          {/*      </TableRow>*/}
          {/*    </TableHeader>*/}
          {/*    <TableBody className="**:data-[slot=table-cell]:first:w-8">*/}

          {/*      {(projects.data.length > 0) ? projects.data.map((project, index) => (*/}
          {/*        <ProjectRow project={project} key={index}/>*/}
          {/*      )) : (*/}
          {/*        <TableRow>*/}
          {/*          <TableCell*/}
          {/*            colSpan={columns.length}*/}
          {/*            className="h-24 text-center"*/}
          {/*          >*/}
          {/*            {"Looks like you haven't created a project yet! Create one to get started."}*/}
          {/*          </TableCell>*/}
          {/*        </TableRow>*/}
          {/*      )}*/}
          {/*    </TableBody>*/}
          {/*  </Table>*/}
          {/*</div>*/}
        </div>


      </div>
    </div>
  );

}