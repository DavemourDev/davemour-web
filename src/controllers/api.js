// import data from '../data/themes.json' assert { type: 'json' };

const { readFile } = require("fs").promises;
const { logger } = require("../logger.js");
const { getPageThemes } = require("../model/page-themes.js");


const dataDir = require('path').join(__dirname, '../data');


const apiIndexAction = (req, res) => {
    const curDate = new Date();
    const time = curDate.toLocaleTimeString();
    const date = curDate.toLocaleDateString();

    const jsonOutput = {
        message: 'Davemour API V1',
        version: 'v1.1',
        date,
        time
    };

    logger.info('API index accessed');
    res.json(jsonOutput);
}

const getThemesAction = async (req, res) => {

    const pageThemes = await getPageThemes();

    logger.info('Themes data accessed');

    res.json(pageThemes);
};

const putThemesAction = async (req, res) => {
    const themes = await readFile(dataDir + '/themes.json', 'utf8').then(data => JSON.parse(data));

    const themeChanges = req.body;

    if (!themeChanges) {
        logger.error('Themes data update failed: No changes provided');
        res.status(400).json({ message: 'No changes provided' });
        return;
    }

    logger.info('Themes data updated');

    // TODO Edit


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