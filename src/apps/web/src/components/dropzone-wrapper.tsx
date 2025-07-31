"use client";


import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import { ReactNode } from "react";



export const DropzoneWrapper = (props: {
  children: ReactNode;
  onDrop?: (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void) | undefined;
  single?: true;
  overlay?: ReactNode;
}) => {

  return (
    <Dropzone
      noClick
      onDrop={props.onDrop}
      maxFiles={props.single ? 1 : undefined}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div {...getRootProps()} className="h-full relative overflow-scroll">
          <input {...getInputProps()} />
          {props.children}
          {isDragActive && (
            props.overlay ?? (
              <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center pointer-events-none">
                <p className="text-white text-lg font-semibold">Drop files here</p>
              </div>
            )
          )}
        </div>
      )}
    </Dropzone>
  );

};