insert into public.permissions 
    (
        level, 
        user_id, 
        client_id, 
        project_id
    ) 
values 
    (
        'READ',
        (select id from auth.users where email = 'harvey@pearsonspecter.com'),
        (select id from public.clients where name = 'Lumon Industries'),
        NULL
    ),
    (
        'READ',
        (select id from auth.users where email = 'harvey@pearsonspecter.com'),
        NULL,
        (select id from public.projects where name = 'Macrodata Refinement')
    )