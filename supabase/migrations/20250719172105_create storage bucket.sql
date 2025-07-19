DO $$
BEGIN
    INSERT INTO storage.buckets (
    id,
    name,
    owner,
    created_at,
    updated_at,
    public,
    avif_autodetection,
    file_size_limit,
    allowed_mime_types,
    owner_id,
    type
    ) VALUES (
    'versions',
    'versions',
    NULL,
    (now() AT TIME ZONE 'utc'::text),
    (now() AT TIME ZONE 'utc'::text),
    FALSE,
    FALSE,
    NULL,
    NULL,
    NULL,
    'STANDARD'
    )
    ON CONFLICT (id) DO NOTHING;
END $$;