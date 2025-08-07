import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@workspace/supabase/types";



export function createClient() {
  if (typeof window === "undefined") {
    throw new Error("createClient() called on the server");
  }

  const url = window.env.SUPABASE_PUBLIC_URL;
  const anonKey = window.env.SUPABASE_PUBLIC_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase environment variables not found in window.env");
  }

  return createBrowserClient<Database>(url, anonKey, { auth: { storageKey: "train360-dms" } });
}
