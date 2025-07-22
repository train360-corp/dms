import { Tables } from "@train360-corp/dms/types/supabase/types.gen";



export const columns: readonly {
  key: keyof Tables<"directories">;
  header: string;
}[] = [
  {
    key: "name",
    header: "Name"
  },
  {
    key: "created_at",
    header: "Created At"
  }
];