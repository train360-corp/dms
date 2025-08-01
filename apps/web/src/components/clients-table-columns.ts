import { Tables } from "@workspace/web/types/supabase/types.gen";



export const columns: readonly {
  key: keyof Tables<"clients">;
  header: string;
  width?: number;
}[] = [
  {
    key: "name",
    header: "Name"
  },
  {
    key: "id",
    header: "No.",
    width: 50
  },
];