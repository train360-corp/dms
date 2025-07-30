import { FileViewer } from "@train360-corp/dms/components/file-viewer/types";
import { PDFFileViewer } from "@train360-corp/dms/components/file-viewer/viewers/pdf-file-viewer";
import { UnsupportedFileViewer } from "@train360-corp/dms/components/file-viewer/viewers/unsupported-file-viewer";



export const FileViewers: FileViewer = (props) => {

  switch (props.blob.type) {
    case "application/pdf":
      return (
        <PDFFileViewer {...props} />
      );
    default:
      return (
        <UnsupportedFileViewer {...props} />
      );
  }

};