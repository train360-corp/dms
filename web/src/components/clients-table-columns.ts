import { Tables } from "@train360-corp/dms/types/supabase/types.gen";



export const columns: readonly {
  key: keyof Tables<"clients">;
  header: string;
}[] = [
  {
    key: "name",
    header: "Name"
  },
  {
    key: "id",
    header: "No.",
  },
];