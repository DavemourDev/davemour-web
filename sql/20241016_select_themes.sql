select * from page_themes;

insert into
    page_themes (
        theme_id,
        name,
        text_color,
        primary_color,
        secondary_color,
        neutral_color,
        accent_color,
        heading_font,
        body_font
    )
values (
        'modern-friendly',
        'Moderno y Amigable',
        '#000000',
        '#4A90E2',
        '#7ED321',
        '#F5F5F5',
        '#F5A623',
        'Montserrat',
        'Roboto'
    )
on CONFLICT (theme_id) do
update
set
    accent_color = '#F5A623',
    body_font = 'Roboto',
    heading_font = 'Montserrat',
    name = 'Moderno y Amigable',
    neutral_color = '#F5F5F5',
    primary_color = '#4A90E2',
    secondary_color = '#7ED321',
    text_color = '#000000';