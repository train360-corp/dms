import { useEffect, useState } from "react";
import { Database, Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { createClient } from "@train360-corp/dms/lib/supabase/client";
import { RealtimeChannel } from "@supabase/realtime-js";
import { v4 } from "uuid";



type Table = keyof Database["public"]["Tables"];
type Column<T extends Table> = string & keyof Tables<{ schema: "public" }, T>;
type UseRealtimeRowsProps<T extends Table, C extends Column<T>> = {
  table: T;
  column: C;
  value: Tables<T>[C];
} | {
  table: T;
}

type UseRealtimeRowsResult<T extends Table> = {
  loading: true;
  rows: undefined;
} | {
  loading: false;
  rows: Tables<T>[];
};


export const useRealtimeRows = <T extends Table, C extends Column<T>>(props: UseRealtimeRowsProps<T, C>): UseRealtimeRowsResult<T> => {

  const [ state, setState ] = useState<Tables<T>[] | undefined>(undefined);
  const key = ("column" in props && "value" in props) ? `${props.table}.${props.column}.${props.value}` : props.table;

  useEffect(() => {
    const supabase = createClient();
    let subscription: RealtimeChannel;
    (async () => {

      const refresh = async () => {
        let query = supabase.from(props.table).select();
        if ("column" in props && "value" in props) query = query.eq(props.column, props.value as any);
        const { data } = await query;
        setState((data as Tables<T>[] | null) ?? []);
      };

      await refresh(); // set the initial state

      subscription = supabase.realtime.channel(v4()).on("postgres_changes", {
          table: props.table,
          schema: "public",
          event: "*",
          filter: ("column" in props && "value" in props) ? `${props.column}=eq.${props.value}` : undefined
        }, async () => await refresh()
      ).subscribe();
    })();
    return () => {
      subscription?.unsubscribe();
    };
  }, [ key ]);

  if (state === undefined) return ({
    loading: true,
    rows: undefined,
  });

  return ({
    loading: false,
    rows: state
  });
};