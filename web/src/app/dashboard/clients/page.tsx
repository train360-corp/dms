import { createClient } from "@train360-corp/dms/lib/supabase/server";



export default async function Page() {

  const supabase = await createClient();

  const { data } = await supabase.from("clients").select();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {data?.map((client, index) => (
          <text key={index}>
            {client.name}
          </text>
        ))}
      </div>
    </div>
  );
}