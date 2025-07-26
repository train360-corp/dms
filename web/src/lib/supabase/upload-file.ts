import * as tus from "tus-js-client";
import { SupabaseClient } from "@supabase/supabase-js";

export const uploadFile = async (supabase: SupabaseClient, options: {
  file: File,
  bucket: string
}) => {

  const supabaseAccessToken = (await supabase.auth.getSession()).data.session?.access_token;
  if (!supabaseAccessToken) {
    throw new Error("User must be logged in.");
  }

  // 2. Build the upload endpoint
  const url = new URL(window.env?.SUPABASE_URL);
  url.pathname = "/storage/v1/upload/resumable";
  const endpoint = url.toString();

  // 3. Start the TUS upload
  const upload = new tus.Upload(options.file, {
    endpoint,
    retryDelays: [0, 3000, 5000, 10000, 20000],
    headers: {
      authorization: `Bearer ${supabaseAccessToken}`,
      apikey: window.env?.SUPABASE_ANON_KEY
    },
    uploadDataDuringCreation: true, // Send metadata with file chunks
    removeFingerprintOnSuccess: true, // Remove fingerprint after successful upload
    chunkSize: 6 * 1024 * 1024, // Chunk size for TUS uploads (6MB)
    metadata: {
      bucketName: options.bucket,
      objectName: options.file.name,
      contentType: options.file.type,
      cacheControl: "3600",
    },
    onError(error) {
      console.error("Upload failed:", error);
    },
    onProgress(bytesUploaded, bytesTotal) {
      const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      console.log(`Upload progress: ${percentage}%`);
    },
    onSuccess() {
      console.log("Upload succeeded:", upload.url);
    },
  });

  upload.start();
};