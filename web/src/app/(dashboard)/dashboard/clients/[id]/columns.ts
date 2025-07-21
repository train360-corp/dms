import { Tables } from "@train360-corp/dms/types/supabase/types.gen";



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