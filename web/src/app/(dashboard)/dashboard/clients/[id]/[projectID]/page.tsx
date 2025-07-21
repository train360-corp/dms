import { createClient } from "@train360-corp/dms/lib/supabase/server";
import { redirect } from "next/navigation";
import { H1, H2, P } from "@train360-corp/dms/components/ui/text";
import * as React from "react";



export default async function Page({ params }: {
  params: Promise<{
    id: string;
    projectID: string;
  }>
}) {

  const { id, projectID } = await params;
  const supabase = await createClient();
  const client = await supabase.from("clients").select().eq("id", Number(id)).single();
  const project = await supabase.from("projects").select().eq("client_id", client.data?.id ?? 0).eq("project_number", Number(projectID)).single();

  if (client.error || project.error) redirect("/dashboard/clients");

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">

        <div className={"flex flex-col"}>
          <P>{client.data.name}</P>
          <H1>{project.data.name}</H1>
        </div>

        <div className={"flex flex-col gap-2 md:gap-4"}>
          <H2>{"Files"}</H2>

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