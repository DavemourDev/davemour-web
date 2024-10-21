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

module.exports = {
    getPageThemes
};