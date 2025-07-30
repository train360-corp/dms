"use client";

import { useEffect, useState } from "react";
import { Camelize, FileObjectV2 } from "@supabase/storage-js";
import { createClient } from "@train360-corp/dms/lib/supabase/client";
import { FileViewers } from "@train360-corp/dms/components/file-viewer/file-viewers";

export const FileViewer = ({ object }: { object: Camelize<FileObjectV2> }) => {
  const [data, setData] = useState<Blob | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const { data } = await createClient().storage.from(object.bucketId).download(`/${object.id}`);
      setData(data);
      console.log(data?.type);
    })();
  }, []);

  if (data === null || data === undefined) return null;

  return (
    <div className="h-full w-full overflow-auto">
      <FileViewers blob={data} />
    </div>
  );
};