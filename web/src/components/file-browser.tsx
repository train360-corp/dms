import { Tables } from "@train360-corp/dms/types/supabase/types.gen";
import { P } from "@train360-corp/dms/components/ui/text";
import Link from "next/link";



export const FileBrowser = ({ client, project, path: $path }: {
  client: Tables<"clients">;
  project: Tables<"projects">;
  path: readonly string[];
}) => {

  const isRootPath = $path.length === 0 || ($path.length === 1 && $path[0] === "_");
  const path = isRootPath ? [] : $path;

  const baseHref = `/dashboard/clients/${client.id}/${project.project_number}`;
  const fullSegments = path.map((_, index, path) => `${baseHref}/${path.slice(0, index + 1).join("/")}`);

  return (
    <div className="outline-1 rounded-2xl outline-muted overflow-hidden">

      {/* Header */}
      <div className="flex flex-row py-2 px-4 gap-2 items-center flex-wrap bg-muted">

        <Link href={`/dashboard/clients/${client.id}`}>
          <P className="cursor-pointer hover:underline">{client.name}</P>
        </Link>

        <P>{"/"}</P>

        <Link href={baseHref}>
          <P className="cursor-pointer hover:underline">{project.name}</P>
        </Link>

        {path.length > 0 && <P>{"/"}</P>}

        {path.map((slug, index) => (
          <span key={index} className="flex flex-row items-center gap-2">
            <Link href={fullSegments[index]}>
              <P className="cursor-pointer hover:underline">{slug}</P>
            </Link>
            {index < path.length - 1 && <P>{"/"}</P>}
          </span>
        ))}
      </div>

      <div>
        <P>{"FOO"}</P>
      </div>

    </div>
  );
};