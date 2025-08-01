import { ReactNode } from "react";
import { Tables } from "@workspace/web/types/supabase/types.gen";



export type FileViewerProps = {
  blob: Blob;
  file: Tables<"files">;
  version: Tables<"files_versions">;
}

export type FileViewer = (props: FileViewerProps) => ReactNode;


