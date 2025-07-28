"use client";

import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@train360-corp/dms/components/ui/table";
import { columns } from "@train360-corp/dms/components/file-browser-directory-columns";
import { useRealtimeRows } from "@train360-corp/dms/hooks/use-realtime-rows";
import { useDebounce } from "@uidotdev/usehooks";
import { IconFolder } from "@tabler/icons-react";
import * as React from "react";
import { useRouter } from "next/navigation";



const WithOrWithoutSymlinks = ({ directories, symlinks, project }: {
  directories: undefined | readonly Tables<"directories">[];
  symlinks: undefined | readonly Tables<"symlinks">[];
  project: Tables<"projects">;
}) => {

  const router = useRouter();
  const loading = useDebounce((directories === undefined || symlinks === undefined), 500);
  const items = (directories?.length ?? 0) + (symlinks?.length ?? 0);

  return (
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

        {(directories !== undefined) && directories.map((directory, index) => (
          <TableRow
            key={directory.id}
            className={"cursor-pointer"}
            onClick={() => router.push(`/dashboard/clients/${project.client_id}/${project.project_number}/${directory.id}`)}
          >
            <TableCell>
              <IconFolder/>
            </TableCell>
            {columns.map((col, index) => (
              <TableCell key={index} className={"last:text-right"}>
                {col.formatter ? col.formatter(directory[col.key]) : directory[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}

        { symlinks !== undefined && symlinks.map((symlink, index) => (
          <TableRow
            key={symlink.id}
            className={"cursor-pointer"}
            // onClick={() => router.push(`/dashboard/clients/${project.client_id}/${project.project_number}/${directory.id}`)}
          >
            <TableCell>
              <IconFolder/>
            </TableCell>
            {columns.map((col, index) => (
              <TableCell key={index} className={"last:text-right"}>
                {col.formatter ? col.formatter(symlink[col.key]) : symlink[col.key]}
              </TableCell>
            ))}
          </TableRow>
        )) }

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
  );
};


const WithoutSymlinks = (props: {
  project: Tables<"projects">;
  directories: undefined | readonly Tables<"directories">[];
}) => {
  return (
    <WithOrWithoutSymlinks
      directories={props.directories}
      symlinks={[]}
      project={props.project}
    />
  );
};

const WithSymlinks = (props: {
  project: Tables<"projects">;
  directory: Tables<"directories">;
  directories: undefined | readonly Tables<"directories">[];
}) => {

  const symlinks = useRealtimeRows({
    table: "symlinks",
    filters: [ {
      column: "directory_id",
      value: props.directory.id
    } ]
  });

  return (
    <WithOrWithoutSymlinks
      directories={props.directories}
      symlinks={symlinks.rows}
      project={props.project}
    />
  );
};


export default function FileBrowserTable(props: {
  directory: Tables<"directories"> | null;
  project: Tables<"projects">;
}) {

  const directories = useRealtimeRows({
    table: "directories",
    filters: [ {
      column: "project_id",
      value: props.project.id
    }, {
      column: "parent_id",
      value: props.directory?.id ?? null
    } ]
  });

  return (
    props.directory === null ?
      <WithoutSymlinks
        project={props.project}
        directories={directories.rows}
      /> :
      <WithSymlinks
        directories={directories.rows}
        directory={props.directory}
        project={props.project}
      />
  );

}