export {};

declare global {

  type RuntimeEnvironment = {
    SUPABASE_PUBLIC_URL: string;
    SUPABASE_PUBLIC_KEY: string;
  };

  type BrowserRuntimeEnvironment = RuntimeEnvironment & {
  }

  namespace NodeJS {
    interface ProcessEnv extends BrowserRuntimeEnvironment{
    }
  }

  interface Window {
    env: BrowserRuntimeEnvironment;
  }
}