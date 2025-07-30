import { ReactNode } from "react";



export type FileViewerProps = {
  blob: Blob;
}

export type FileViewer = (props: FileViewerProps) => ReactNode;


