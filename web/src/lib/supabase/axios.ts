import Axios, { AxiosInstance } from "axios";
import { createClient } from "@train360-corp/dms/lib/supabase/client";



const axios: AxiosInstance = Axios.create({
  headers: {
    apiKey: window.env?.SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
  },
});


axios.interceptors.request.use(async (config) => {
  const { data } = await createClient().auth.getSession();
  const accessToken = data.session?.access_token;

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

export default axios;