"use client";

import { useEffect, useState } from "react";
import { createClient } from "@train360-corp/dms/lib/supabase/client";
import { FileViewers } from "@train360-corp/dms/components/file-viewer/viewers";
import { Card } from "@train360-corp/dms/components/ui/card";
import { NIL, v4 } from "uuid";
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
import { H4, P } from "@train360-corp/dms/components/ui/text";
import { Separator } from "@train360-corp/dms/components/ui/separator";
import { Button } from "@train360-corp/dms/components/ui/button";
import { IconDownload, IconFolderPlus, IconLink, IconSend } from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@train360-corp/dms/components/ui/tooltip";
import { Skeleton } from "@train360-corp/dms/components/ui/skeleton";
import { DropzoneWrapper } from "@train360-corp/dms/components/dropzone-wrapper";
import { toast } from "sonner";
import { uploadFile } from "@train360-corp/dms/lib/supabase/upload-file";
import { PostgrestError } from "@supabase/supabase-js";
import { useDebounce } from "@uidotdev/usehooks";
import { Camelize, FileObjectV2 } from "@supabase/storage-js";



type State = {
  isLoading: true;
  version: undefined;
  data: undefined;
} | {
  isLoading: false;
  version: null;
  data: undefined;
} | {
  isLoading: true;
  version: Tables<"files_versions">;
  data: undefined;
} | {
  isLoading: false;
  version: Tables<"files_versions">;
  data: null;
} | {
  isLoading: false;
  version: Tables<"files_versions">;
  data: {
    info: Camelize<FileObjectV2>,
    blob: Blob
  };
}

export const FileViewer = (props: {
  file: Tables<"files">;
  project: Tables<"projects">;
}) => {

  const [ state, setState ] = useState<State>({
    isLoading: true,
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
        setState({ version: null, data: undefined, isLoading: false });
        return;
      }

      const { data: object } = await supabase.storage.from(props.project.id).info(`/${version.object_id}`);
      if (!object) {
        setState({ version, data: null, isLoading: false });
        return;
      }

      const { data } = await supabase.storage.from(object.bucketId).download(`/${object.id}`);
      setState({ version, data: data === null ? null : { info: object, blob: data }, isLoading: false });
    })();
  }, [ state.version?.version ]);

  const className = "h-full w-full overflow-auto flex flex-row gap-4 md:gap-6";

  if (state.data === null || state.data === undefined || versions.rows === undefined) return (
    <div className={className}>
      <Skeleton className={"w-[66%] max-w-[66%] h-full rounded-xl"}/>
      <Skeleton className={"w-[33%] max-w-[33%] h-full rounded-xl"}/>
    </div>
  );

  return (
    <DropzoneWrapper
      overlay={(
        <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center pointer-events-none">
          <p className="text-white text-lg font-semibold">{"Upload new version"}</p>
        </div>
      )}
      onDrop={async (files) => {
        if(files.length !== 1) toast.error(`${files.length} Files Dropped!`, {
          description: "Upload only a single file."
        });

        const supabase = createClient();
        const file = files[0];

        if(file.type !== state.data?.info.contentType) {
          toast.error("Type Mismatch!", {
            description: `File is ${state.data?.info.contentType} but uploaded file is ${file.type}.`
          })
          return;
        }

        await uploadFile(supabase, {
          file,
          bucket: props.project.id,
          onSuccess: async (objectID) => {
            const { error: createFileVersionError } = await supabase.from("files_versions").insert({
              object_id: objectID,
              file_id: props.file.id,
              version: 0, // auto-set in db trigger
              name: file.name,
            });
            if (createFileVersionError) toast.error("Unable to Create Version!", {
              description: "An error occurred while creating the file version."
            });
          },
          onError: error => {
            if ("originalResponse" in error && error.originalResponse?.getStatus() === 403) toast.error("Permission Denied", {
              description: "You do not have permission to upload to this project."
            });
            else toast.error("Request Failed", {
              description: "An unknown error occurred."
            });
          },
        });

      }}
    >
      <div className={className}>
        {/* VIEWER */}
        <Card className={"py-0 w-[66%] max-w-[66%]"}>
          <FileViewers blob={state.data.blob}/>
        </Card>

        {/* SIDEBAR */}
        <Card className={"p-4 w-[33%] max-w-[33%]"}>


          <div className="flex flex-col gap-1">
            <Badge variant={"secondary"} className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
              {`File No. ${props.file.number}`}
            </Badge>

            <H4 className={"max-w-full truncate"}>{state.version.name}</H4>
          </div>

          <div className={"flex flex-col w-full gap-1"}>
            <P className={"text-xs"}>{"Viewing Version"}</P>
            <Select
              value={state.version.id}
              onValueChange={(versionID) => setState({
                version: versions.rows?.find((v) => v.id === versionID),
                data: undefined,
                isLoading: true
              })}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select a version"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{"Versions"}</SelectLabel>
                  {versions.rows?.toSorted((a, b) => b.version - a.version).map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      <div className="w-full flex flex-row items-center gap-2 whitespace-nowrap">
                        <Badge
                          variant="secondary"
                          className="h-5 min-w-5 shrink-0 rounded-full px-1 font-mono tabular-nums"
                        >
                          {version.version}
                        </Badge>

                        {/* Name text grows and truncates */}
                        {version.name.trim() ? (
                          <P className="flex-1 truncate">{version.name.trim()}</P>
                        ) : (
                          <P className="flex-1 text-muted truncate">Unnamed version</P>
                        )}

                        {version.id === (props.file.current_version_id ?? NIL) && (
                          <Badge
                            variant="default"
                            className="h-5 min-w-5 shrink-0 rounded-full px-1 font-mono tabular-nums dark:text-white"
                          >
                            Current
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Separator orientation={"horizontal"}/>

          <div className={"flex flex-row gap-4 w-full justify-center"}>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href={URL.createObjectURL(state.data.blob)} download>
                  <Button variant={"outline"} size={"icon"}>
                    <IconDownload size={8}/>
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <P>{"Download"}</P>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled variant={"outline"} size={"icon"}>
                  <IconLink size={8}/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <P>{"Copy Link"}</P>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled variant={"outline"} size={"icon"}>
                  <IconFolderPlus size={8}/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <P>{"Add to Folder"}</P>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled variant={"outline"} size={"icon"}>
                  <IconSend size={8}/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <P>{"Send a Copy"}</P>
              </TooltipContent>
            </Tooltip>

          </div>
        </Card>
      </div>
    </DropzoneWrapper>
  );
};