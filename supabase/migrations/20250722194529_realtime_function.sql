SET check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.enable_realtime(_table text)
RETURNS text
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Set REPLICA IDENTITY FULL
  EXECUTE format(
    'ALTER TABLE public.%I REPLICA IDENTITY FULL;',
    _table
  );

  -- Add to supabase_realtime publication
  EXECUTE format(
    'ALTER PUBLICATION supabase_realtime ADD TABLE public.%I;',
    _table
  );

  RETURN 'success';
END;
$function$;