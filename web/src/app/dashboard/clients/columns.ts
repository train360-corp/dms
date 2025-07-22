import { Tables } from "@train360-corp/dms/types/supabase/types.gen";



export const columns: readonly {
  key: keyof Tables<"clients">;
  header: string;
}[] = [
  {
    key: "id",
    header: "No.",
  },
  {
    key: "name",
    header: "Name"
  }
];