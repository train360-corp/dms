"use client";

import Dropzone from "react-dropzone";
import { ReactNode } from "react";
import { Separator } from "@train360-corp/dms/components/ui/separator";
import { uploadFile } from "@train360-corp/dms/lib/supabase/upload-file";
import { createClient } from "@train360-corp/dms/lib/supabase/client";
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";
import { error } from "next/dist/build/output/log";
import { v4 } from "uuid";



export const FileBrowserInsert = ({ children, bucket }: {
  children: ReactNode;
  bucket: string;
}) => {

  return (
    <Dropzone
      noClick
      onDrop={files => files.forEach(file => uploadFile(createClient(), {
        file,
        bucket,
        onSuccess: async (objectID) => {
          const supabase = createClient();

          const handleError = (error: PostgrestError) => {
            console.error(error);
            toast.error("Request Failed", {
              description: "An unknown error occurred."
            });
          }

          // create the file
          const fileID = v4();
          const {error: createFileError} = await supabase.from("files").insert({ id: fileID });
          if (createFileError) return handleError(createFileError);

          // create the file version
          const {error: createFileVersionError} = await supabase.from("files_versions").insert({
            object_id: objectID,
            file_id: fileID,
            version: 1,
          });
          if (createFileVersionError) return handleError(createFileVersionError);

          // TODO: create the symlink to the file in the directory

        },
        onError: error => {
          if ("originalResponse" in error && error.originalResponse?.getStatus() === 403) toast.error("Permission Denied", {
            description: "You do not have permission to upload to this project."
          });
          else toast.error("Request Failed", {
            description: "An unknown error occurred."
          });
        },
      }))}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div {...getRootProps()} className="h-full relative">
          <input {...getInputProps()} />
          {children}
          <Separator orientation={"horizontal"}/>
          {isDragActive && (
            <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center pointer-events-none">
              <p className="text-white text-lg font-semibold">Drop files here</p>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );

};