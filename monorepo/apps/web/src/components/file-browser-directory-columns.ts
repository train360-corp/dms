import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { DateTime } from "luxon";



type Row<T extends keyof Tables<"directories"> & keyof Tables<"symlinks">> = {
  key: T;
  header: string;
  formatter?: (v: Tables<"directories">[T]) => string;
}


export const columns: readonly (Row<keyof Tables<"directories"> & keyof Tables<"symlinks">>)[] = [
  {
    key: "name",
    header: "Name"
  },
  {
    key: "created_at",
    header: "Created At",
    formatter: (row) => row ? (DateTime.fromISO(row).toRelative() ?? "") : "",
  }
];