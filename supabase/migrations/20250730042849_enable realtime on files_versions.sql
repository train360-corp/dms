DO $$
BEGIN
    PERFORM public.enable_realtime('files_versions');
END $$;