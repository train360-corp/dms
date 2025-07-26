"use client";

import Dropzone from "react-dropzone";
import { ReactNode } from "react";
import { Separator } from "@train360-corp/dms/components/ui/separator";
import { uploadFile } from "@train360-corp/dms/lib/supabase/upload-file";
import { createClient } from "@train360-corp/dms/lib/supabase/client";



export const FileBrowserInsert = ({children, bucket}: {
  children: ReactNode;
  bucket: string;
}) => {

  return (
    <Dropzone
      noClick
      onDrop={files => files.forEach(file => uploadFile(createClient(), {
        file,
        bucket,
      }))}
    >
      {({getRootProps, getInputProps, isDragActive}) => (
        <div {...getRootProps()} className="h-full relative">
          <input {...getInputProps()} />
          {children}
          <Separator orientation={"horizontal"} />
          {isDragActive && (
            <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center pointer-events-none">
              <p className="text-white text-lg font-semibold">Drop files here</p>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );

}