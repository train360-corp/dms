import { FileViewerProps } from "@train360-corp/dms/components/file-viewer/types";
import { H1, P } from "@train360-corp/dms/components/ui/text";
import { Button } from "@train360-corp/dms/components/ui/button";

export const UnsupportedFileViewer = ({ blob }: FileViewerProps) => {
  const url = URL.createObjectURL(blob);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full p-8 overflow-auto bg-muted/30 rounded-lg">
      <H1 className="text-lg md:text-2xl">Unable to Render Preview</H1>
      <P className="max-w-md text-muted-foreground mt-2">
        This file type is not supported for preview. You can still download the file to view it locally.
      </P>
      <a href={url} download className="mt-4">
        <Button>Download File</Button>
      </a>
    </div>
  );
};