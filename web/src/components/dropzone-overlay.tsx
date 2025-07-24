"use client";

import { useDropzone } from "react-dropzone";
import { useCallback } from "react";



type DropzoneOverlayProps = {
  onDropAction?: (files: File[]) => void;
};

export function DropzoneOverlay({
                                  onDropAction = () => {},
                                }: DropzoneOverlayProps) {
  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      onDropAction(acceptedFiles);
    },
    [ onDropAction ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    onDropAccepted,
  });

  return (
    <div {...getRootProps()} className="relative w-full h-full">
      <input {...getInputProps()} />

      {isDragActive && (
        <div
          className="absolute inset-0 z-10 bg-black/40 rounded-lg flex items-center justify-center pointer-events-none">
          <span className="text-white text-lg font-semibold">Drop your files here</span>
        </div>
      )}
    </div>
  );
}