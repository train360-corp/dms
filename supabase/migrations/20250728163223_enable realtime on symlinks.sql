DO $$
BEGIN
    PERFORM public.enable_realtime('symlinks');
    PERFORM public.enable_realtime('directories');
END $$;