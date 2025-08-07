import { ReactNode } from "react";
import { Tables } from "@workspace/supabase/types";



export type FileViewerProps = {
  blob: Blob;
  file: Tables<"files">;
  version: Tables<"files_versions">;
}

export type FileViewer = (props: FileViewerProps) => ReactNode;


