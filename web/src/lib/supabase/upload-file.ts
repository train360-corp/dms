import * as tus from "tus-js-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { DetailedError, OnSuccessPayload } from "tus-js-client";
import { v4 } from "uuid";

export const uploadFile = async (supabase: SupabaseClient, options: {
  file: File,
  bucket: string,
  onError?: (error: Error | DetailedError) => void,
  onProgress?: (progress: number) => void,
  onSuccess?: (id: string, response: OnSuccessPayload) => void,
}) => {

  const supabaseAccessToken = (await supabase.auth.getSession()).data.session?.access_token;
  if (!supabaseAccessToken) {
    throw new Error("User must be logged in.");
  }

  const url = new URL(window.env?.SUPABASE_URL);
  url.pathname = "/storage/v1/upload/resumable";
  const endpoint = url.toString();

  const fileID = v4();

  const upload = new tus.Upload(options.file, {
    endpoint,
    retryDelays: [0, 3000, 5000, 10000, 20000],
    headers: {
      authorization: `Bearer ${supabaseAccessToken}`,
      apikey: window.env?.SUPABASE_ANON_KEY,
    },
    uploadDataDuringCreation: true, // Send metadata with file chunks
    removeFingerprintOnSuccess: true, // Remove fingerprint after successful upload
    chunkSize: 6 * 1024 * 1024, // Chunk size for TUS uploads (6MB)
    metadata: {
      bucketName: options.bucket,
      objectName: fileID,
      contentType: options.file.type,
      cacheControl: "3600",
      userMetadata: JSON.stringify({
        foo: "bar"
      })
    },
    onError: (error) => options.onError ? options.onError(error) : console.error("Upload failed:", error),
    onProgress: (bytesUploaded, bytesTotal) => options.onProgress && options.onProgress(((bytesUploaded / bytesTotal) * 100)),
    onSuccess: (response) => options.onSuccess && options.onSuccess(fileID, response),
  });

  upload.start();
};