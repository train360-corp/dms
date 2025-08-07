import { Tables } from "@workspace/supabase/types";



export const columns: readonly {
  key: keyof Tables<"projects">;
  header: string;
}[] = [
  {
    key: "project_number",
    header: "No.",
  },
  {
    key: "name",
    header: "Name"
  }
];