export {};

declare global {
  type BrowserRuntimeEnvironment = {
    SUPABASE_PUBLIC_URL: string;
    SUPABASE_PUBLIC_KEY: string;
  }

  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_PUBLIC_URL: BrowserRuntimeEnvironment["SUPABASE_PUBLIC_URL"];
      SUPABASE_PUBLIC_KEY: BrowserRuntimeEnvironment["SUPABASE_PUBLIC_KEY"];
    }
  }

  interface Window {
    env: BrowserRuntimeEnvironment;
  }
}