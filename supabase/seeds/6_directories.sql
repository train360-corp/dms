insert into public.directories (
    project_id, 
    id, 
    name, 
    parent_id
) values 
(
    (select id from public.projects where name = 'Macrodata Refinement'),
    '5FA28424-D5B8-40EC-813D-2A6CDB2A2788'::uuid,
    'Opening Documents',
    NULL
),
(
    (select id from public.projects where name = 'Macrodata Refinement'),
    'FACF387B-1E9E-4268-B059-04004CF16FF0'::uuid,
    'Closing Documents',
    NULL
),
(
    (select id from public.projects where name = 'Macrodata Refinement'),
    '0518E1C7-91DD-471A-B934-35DF7729B664'::uuid,
    'Contracts',
    NULL
),
(
    (select id from public.projects where name = 'Macrodata Refinement'),
    gen_random_uuid (),
    'R., Helly',
    '0518E1C7-91DD-471A-B934-35DF7729B664'::uuid
);