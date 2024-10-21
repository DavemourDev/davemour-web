drop table if exists page_themes;

-- Create table for color themes
CREATE TABLE color_themes (
    theme_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    primary_color VARCHAR(7) NOT NULL,
    secondary_color VARCHAR(7) NOT NULL,
    neutral_color VARCHAR(7) NOT NULL,
    accent_color VARCHAR(7) NOT NULL
);

-- Create table for font themes
CREATE TABLE font_themes (
    theme_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    heading_font VARCHAR(255) NOT NULL,
    body_font VARCHAR(255) NOT NULL
);

-- Create table for base text
CREATE TABLE base_text (
    text_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL
);

-- Insert data into color_themes
INSERT INTO
    color_themes (
        theme_id,
        name,
        primary_color,
        secondary_color,
        neutral_color,
        accent_color
    )
VALUES (
        'modern-friendly',
        'Moderno y Amigable',
        '#4A90E2',
        '#7ED321',
        '#F5F5F5',
        '#F5A623'
    ),
    (
        'dynamic-tech',
        'Dinamismo y Tecnología',
        '#007AFF',
        '#FF9500',
        '#8E8E93',
        '#34C759'
    ),
    (
        'professional-sophisticated',
        'Profesional y Sofisticado',
        '#2C3E50',
        '#1ABC9C',
        '#ECF0F1',
        '#F39C12'
    ),
    (
        'creative-innovative',
        'Innovador y Creativo',
        '#9B59B6',
        '#3498DB',
        '#BDC3C7',
        '#F1C40F'
    ),
    (
        'warm-friendly',
        'Tonos Cálidos y Amables',
        '#4A90E2',
        '#F76C5E',
        '#FFFFFF',
        '#FF6347'
    );

-- Insert data into font_themes
INSERT INTO
    font_themes (
        theme_id,
        name,
        heading_font,
        body_font
    )
VALUES (
        'modern-friendly',
        'Moderno y Amigable',
        'Poppins',
        'Open Sans'
    ),
    (
        'professional-dynamic',
        'Profesional y Dinámico',
        'Montserrat',
        'Roboto'
    ),
    (
        'tech-sophisticated',
        'Tecnológico y Sofisticado',
        'IBM Plex Sans',
        'Source Sans Pro'
    ),
    (
        'creative-versatile',
        'Creativo y Versátil',
        'Playfair Display',
        'Nunito'
    );

-- Insert data into base_text
INSERT INTO
    base_text (text_id, name, color)
VALUES (
        'soft-black',
        'Negro Suave',
        '#212121'
    ),
    (
        'dark-gray',
        'Gris Oscuro',
        '#333333'
    ),
    (
        'neutral-gray',
        'Gris Neutro',
        '#4D4D4D'
    );