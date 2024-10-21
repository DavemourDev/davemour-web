drop table if exists base_text;

drop table if exists color_themes;

drop table if exists font_themes;

drop table if exists page_themes;

CREATE TABLE page_themes (
    theme_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    text_color VARCHAR(7) NOT NULL,
    primary_color VARCHAR(7) NOT NULL,
    secondary_color VARCHAR(7) NOT NULL,
    neutral_color VARCHAR(7) NOT NULL,
    accent_color VARCHAR(7) NOT NULL,
    heading_font VARCHAR(255) NOT NULL,
    body_font VARCHAR(255) NOT NULL
);

INSERT INTO
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
VALUES (
        'modern-friendly',
        'Moderno y Amigable',
        '#000000',
        '#4A90E2',
        '#7ED321',
        '#F5F5F5',
        '#F5A623',
        'Montserrat',
        'Roboto'
    ),
    (
        'dynamic-tech',
        'Dinamismo y Tecnología',
        '#FFFFFF',
        '#007AFF',
        '#FF9500',
        '#8E8E93',
        '#34C759',
        'Montserrat',
        'Roboto'
    ),
    (
        'professional-sophisticated',
        'Profesional y Sofisticado',
        '#FFFFFF',
        '#2C3E50',
        '#1ABC9C',
        '#ECF0F1',
        '#F39C12',
        'IBM Plex Sans',
        'Source Sans Pro'
    );

INSERT INTO
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
VALUES (
        1,
        'Theme Name',
        '#000000',
        '#FF0000',
        '#00FF00',
        '#FFFFFF',
        '#0000FF',
        'Arial',
        'Times New Roman'
    )
ON CONFLICT (theme_id) DO
UPDATE
SET
    accent_color = excluded.accent_color,
    body_font = excluded.body_font,
    heading_font = excluded.heading_font,
    name = excluded.name,
    neutral_color = excluded.neutral_color,
    primary_color = excluded.primary_color,
    secondary_color = excluded.secondary_color,
    text_color = excluded.text_color;