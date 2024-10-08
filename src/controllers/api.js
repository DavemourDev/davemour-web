// import data from '../data/themes.json' assert { type: 'json' };

const { readFile } = require("fs").promises;
const { query } = require('../database.js');
const { head } = require("../routes/index.js");

const dataDir = require('path').join(__dirname, '../data');


async function getFontThemesData() {
    const result = await query('SELECT * FROM font_themes');

    const fontThemes = {};

    result.results.forEach(row => {
        fontThemes[row.theme_id] = {
            name: row.name,
            fonts: {
                heading: row.heading_font,
                body: row.body_font
            }
        };
    });

    return fontThemes;
}

async function getColorThemesData() {
    const result = await query('SELECT * FROM color_themes');

    const colorThemes = {};

    result.results.forEach(row => {
        colorThemes[row.theme_id] = {
            name: row.name,
            colors: {
                primary: row.primary_color,
                secondary: row.secondary_color,
                neutral: row.neutral_color,
                accent: row.accent_color
            }
        };
    });

    return colorThemes;
}

async function getBaseTextData() {
    const result = await query('SELECT * FROM base_text');

    const baseTextColors = {};

    result.results.forEach(row => {
        baseTextColors[row.text_id] = {
            name: row.name,
            color: row.color
        };
    });

    return baseTextColors;
}

const apiIndexAction = (req, res) => {
    const time = new Date().toLocaleTimeString();
    res.json({ message: 'API v1', time });
}

const getThemesAction = async (req, res) => {

    const fontThemes = await getFontThemesData();
    const colorThemes = await getColorThemesData();
    const baseText = await getBaseTextData();

    const responseData = {
        'font-themes': fontThemes,
        'color-themes': colorThemes,
        'base-text': baseText
    }

    res.json(responseData);

    // res.json(themes);
};

const putThemesAction = async (req, res) => {
    const themes = await readFile(dataDir + '/themes.json', 'utf8').then(data => JSON.parse(data));

    const themeChanges = req.body;

    if (!themeChanges) {
        res.status(400).json({ message: 'No changes provided' });
        return;
    }

    const updatedThemes = {
        'color-themes': { ...themes['color-themes'], ...(themeChanges['color-themes'] || {}) },
        'font-themes': { ...themes['font-themes'], ...(themeChanges['font-themes'] || {}) },
        'base-text': { ...themes['base-text'], ...(themeChanges['base-text'] || {}) }
    };

    res.json(updatedThemes);
}

module.exports = {
    apiIndexAction,
    getThemesAction,
    putThemesAction
};