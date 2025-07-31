import { FileViewer } from "@train360-corp/dms/components/file-viewer/types";
import { PDFFileViewer } from "@train360-corp/dms/components/file-viewer/viewers/pdf-file-viewer";
import { UnsupportedFileViewer } from "@train360-corp/dms/components/file-viewer/viewers/unsupported-file-viewer";
import { ImageFileViewer } from "@train360-corp/dms/components/file-viewer/viewers/image-file-viewer";



export const FileViewers: FileViewer = (props) => {

  switch (props.blob.type) {
    case "application/pdf":
      return (
        <PDFFileViewer {...props} />
      );
    case "image/png":
    case "image/jpeg":
    case "image/gif":
    case "image/webp":
    case "image/svg+xml":
    case "image/bmp":
    case "image/tiff":
    case "image/x-icon":
    case "image/vnd.microsoft.icon":
    case "image/avif":
      return (
        <ImageFileViewer {...props} />
      );
    default:
      return (
        <UnsupportedFileViewer {...props} />
      );
  }

};