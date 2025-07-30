"use client";

import { useEffect, useState } from "react";
import { createClient } from "@train360-corp/dms/lib/supabase/client";
import { FileViewers } from "@train360-corp/dms/components/file-viewer/viewers";
import { Card } from "@train360-corp/dms/components/ui/card";
import { NIL } from "uuid";
import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@train360-corp/dms/components/ui/select";
import { useRealtimeRows } from "@train360-corp/dms/hooks/use-realtime-rows";
import { Badge } from "@train360-corp/dms/components/ui/badge";
import {P} from "@train360-corp/dms/components/ui/text";



type State = {
  version: undefined;
  data: undefined;
} | {
  version: null;
  data: undefined;
} | {
  version: Tables<"files_versions">;
  data: undefined;
} | {
  version: Tables<"files_versions">;
  data: null;
} | {
  version: Tables<"files_versions">;
  data: Blob;
}

export const FileViewer = (props: {
  file: Tables<"files">;
  project: Tables<"projects">;
}) => {

  const [ state, setState ] = useState<State>({
    version: undefined,
    data: undefined
  });

  const versions = useRealtimeRows({
    table: "files_versions",
    filters: [
      {
        column: "file_id",
        value: props.file.id
      }
    ]
  });

  // handle version change
  useEffect(() => {
    (async () => {

      const supabase = createClient();

      let versionQuery = supabase.from("files_versions").select().eq("file_id", props.file.id);
      if (state.version !== undefined && state.version !== null) versionQuery = versionQuery.eq("version", state.version.version);
      else versionQuery = versionQuery.eq("id", props.file.current_version_id ?? NIL);
      const { data: version } = await versionQuery.single();

      if (!version) {
        setState({ version: null, data: undefined });
        return;
      }

      const { data: object } = await supabase.storage.from(props.project.id).info(`/${version.object_id}`);
      if (!object) {
        setState({ version, data: null });
        return;
      }

      const { data } = await supabase.storage.from(object.bucketId).download(`/${object.id}`);
      setState({ version, data });
    })();
  }, [ state.version ]);

  if (state.data === null || state.data === undefined) return null;

  return (
    <div className="h-full w-full overflow-auto flex flex-row gap-4 md:gap-6">
      <Card className={"py-0 w-full"}>
        <FileViewers blob={state.data}/>
      </Card>
      <Card className={"p-4 w-[33%]"}>
        <Select
          disabled={!state.version || versions.loading}
          value={state.version?.id}
          onValueChange={(versionID) => setState({
            version: versions.rows?.find((v) => v.id === versionID),
            data: undefined
          })}
        >
          <SelectTrigger className={"w-full"}>
            <SelectValue placeholder="Select a fruit"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{"Versions"}</SelectLabel>
              {versions.rows?.map((version) => (
                <SelectItem
                  key={version.id}
                  value={state.version.id}
                >
                  <div className={"flex flex-row gap-2 items-center"}>
                    <Badge variant={"secondary"} className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                      {version.version}
                    </Badge>
                    {version.name.trim() ? (
                      <P>{version.name.trim()}</P>
                    ) : (
                      <P className={"text-muted"}>{"Unnamed version"}</P>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Card>
    </div>
  );
};