const { query } = require('../database.js');
const { logger } = require('../logger.js');

const getPageThemes = async () => {
    const dbResult = await query('SELECT * FROM page_themes');

    if (!dbResult.success) {
        console.error(dbResult.message)
        return null;
    }

    logger.info('Page themes data accessed');

    return dbResult.results.reduce((themes, row) => {
        themes[row.theme_id] = {
            name: row.name,
            fonts: {
                heading: row.heading_font,
                body: row.body_font
            },
            colors: {
                primary: row.primary_color,
                secondary: row.secondary_color,
                neutral: row.neutral_color,
                accent: row.accent_color,
                text: row.text_color
            }
        };
        return themes;
    }, {});
};


const upsertPageTheme = async (themeId, themeData) => {
    const dbResult = await query(` INSERT INTO page_themes (
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
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  ON CONFLICT (theme_id) DO UPDATE SET
    accent_color = excluded.accent_color,
    body_font = excluded.body_font,
    heading_font = excluded.heading_font,
    name = excluded.name,
    neutral_color = excluded.neutral_color,
    primary_color = excluded.primary_color,
    secondary_color = excluded.secondary_color,
    text_color = excluded.text_color;`, [
        themeId,
        themeData.name,
        themeData.colors.text,
        themeData.colors.primary,
        themeData.colors.secondary,
        themeData.colors.neutral,
        themeData.colors.accent,
        themeData.fonts.heading,
        themeData.fonts.body,
    ]);

    if (!dbResult.success) {
        console.error(dbResult.message);
        return false;
    }

    logger.info(dbResult.query === 'INSERT' ? 'Page theme created' : 'Page theme updated');
    return true;
};

module.exports = {
    getPageThemes,
    upsertPageTheme
};